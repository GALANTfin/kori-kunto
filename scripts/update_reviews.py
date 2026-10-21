#!/usr/bin/env python3
"""Fetch KoriKunto reviews from AutoJerry and write reviews.json.
Only first name + last initial are stored. If nothing can be parsed, the old file is kept and the job fails."""
import json, re, sys, urllib.request
from html.parser import HTMLParser

URL = "https://autojerry.fi/autokorjaamo/espoo/pdr-korjaus-auton-pesut-ja-kiillotukset/"
OUT = "reviews.json"

class Text(HTMLParser):
    def __init__(self):
        super().__init__(); self.lines = []; self.skip = 0
    def handle_starttag(self, t, a):
        if t in ("script", "style"): self.skip += 1
    def handle_endtag(self, t):
        if t in ("script", "style"): self.skip -= 1
    def handle_data(self, d):
        d = d.strip()
        if d and not self.skip: self.lines.append(d)

def short(name):
    p = name.split()
    return name if len(p) < 2 else f"{p[0]} {p[-1][0]}."

def main():
    req = urllib.request.Request(URL, headers={"User-Agent": "KoriKuntoSite/1.0 (korikunto@gmail.com)"})
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
    p = Text(); p.feed(html); L = p.lines
    reviews, i = [], 0
    while i < len(L):
        m = re.fullmatch(r"(\d\d)\.(\d\d)\.(\d{4})", L[i])
        if not m: i += 1; continue
        j = i + 1
        while j < len(L) and not L[j].startswith("Huollot") and j - i < 8: j += 1
        if j >= len(L) or not L[j].startswith("Huollot"): i += 1; continue
        head = [x for x in L[i+1:j] if x not in ("–", "-") and not re.fullmatch(r"\(\d{4}\)|\(0\)", x)]
        k = j + 1
        if L[j].strip() in ("Huollot", "Huollot:") and k < len(L): k += 1   # service list line
        body = []
        while k < len(L) and not L[k].startswith("Huollon varannut") and len(body) < 12:
            body.append(L[k]); k += 1
        if len(head) >= 2 and body:
            reviews.append(dict(date=f"{m[3]}-{m[2]}-{m[1]}", name=short(head[0]), car=head[1], text=" ".join(body)))
        i = k
    if not reviews:
        sys.exit("No reviews parsed - page layout probably changed. reviews.json left untouched.")
    txt = " ".join(L)
    r = re.search(r"Keskiarvo\s*([\d,]+)", txt); c = re.search(r"Arvosteluja\s*(\d+)", txt)
    out = dict(updated=__import__("datetime").date.today().isoformat(),
               rating=r.group(1) if r else "5,0", count=int(c.group(1)) if c else len(reviews),
               url=URL + "#reviews", reviews=reviews)
    json.dump(out, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"OK: {len(reviews)} reviews")

main()

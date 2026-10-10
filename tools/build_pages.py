#!/usr/bin/env python3
"""Generates the 10 service pages (FI+RU in one file each). Edit CONTENT below, run:  python tools/build_pages.py"""
import json, os
from content_en import EN
from overrides import apply, NOTES, DEFAULT_NOTE, EXTRAS_TEXT
OUT = os.path.join(os.path.dirname(__file__), "..")

# slug, title_fi, title_ru, [fi: intro, items, faq], [ru: intro, items, faq]
CONTENT = [
("autohuolto-ja-korjaus","Autohuolto ja korjaus","Обслуживание и ремонт авто",
 ("Huollamme ja korjaamme kaikkia automerkkejä Espoossa. Vikavalo palaa, auto ääntelee tai määräaikaishuolto lähestyy – selvitämme ensin vian syyn ja kerromme, mitä korjaus oikeasti vaatii. Teemme vain sen, mikä on tarpeen.",
  ["Vianmääritys ja tietokonediagnostiikka","Öljyn- ja suodattimien vaihto","Jarrut: palat ja levyt","Alusta, jousitus ja ohjaus","Sähkövikojen ja akun tarkistus"],
  [("Vikavalo palaa – voinko ajaa autolla?","Riippuu valosta. Punainen varoitusvalo tarkoittaa yleensä, että ajo pitää lopettaa heti. Keltainen tai oranssi valo vaatii tarkistuksen pian. Soita, niin neuvomme tilanteen mukaan."),
   ("Kuinka usein auto pitää huoltaa?","Valmistajan huolto-ohjelman mukaan, usein kerran vuodessa tai 15 000–30 000 km välein."),
   ("Kerrotteko hinnan ennen työn aloitusta?","Kyllä. Kerromme arvion etukäteen, emmekä tee korjauksia ilman sopimusta.")]),
 ("Обслуживаем и ремонтируем автомобили всех марок в Эспоо. Горит индикатор, появился посторонний шум или подходит плановое ТО — сначала выясняем причину и честно говорим, что действительно нужно ремонтировать. Делаем только необходимое.",
  ["Поиск неисправностей и компьютерная диагностика","Замена масла и фильтров","Тормоза: колодки и диски","Ходовая часть, подвеска и рулевое","Проверка электрики и аккумулятора"],
  [("Горит индикатор — можно ли ехать?","Зависит от индикатора. Красный обычно значит: остановитесь сразу. Жёлтый или оранжевый — нужна проверка в ближайшее время. Позвоните, подскажем по ситуации."),
   ("Как часто нужно делать ТО?","По регламенту производителя, чаще всего раз в год или каждые 15 000–30 000 км."),
   ("Вы называете цену до начала работ?","Да. Называем оценку заранее и не делаем ремонт без вашего согласия.")])),
("tuulilasien-vaihto","Tuulilasien vaihto","Замена лобовых стёкол",
 ("Vaihdamme tuulilasin ja korjaamme kiveniskemät. Pieni isku kannattaa korjata heti: silloin se ei ehdi levitä halkeamaksi, eikä koko lasia tarvitse vaihtaa.",
  ["Tuulilasin vaihto","Kiveniskemän korjaus","Sivu- ja takalasit","Tiivisteiden ja listojen tarkistus vaihdon yhteydessä"],
  [("Voiko kiveniskemän korjata, vai pitääkö lasi vaihtaa?","Pieni isku voidaan yleensä korjata, jos se ei ole suoraan kuljettajan näkökentässä tai lasin reunassa. Muuten lasi vaihdetaan."),
   ("Voinko ajaa heti vaihdon jälkeen?","Liiman kovettumisaika vaihtelee. Kerromme tarkan odotusajan työn yhteydessä."),
   ("Korvaako vakuutus lasivahingon?","Monissa vakuutuksissa lasivahinko korvataan. Tarkista ehdot omalta vakuutusyhtiöltäsi.")]),
 ("Меняем лобовые стёкла и ремонтируем сколы. Небольшой скол лучше устранить сразу: пока он не превратился в трещину, не придётся менять всё стекло.",
  ["Замена лобового стекла","Ремонт сколов","Боковые и заднее стёкла","Проверка уплотнителей и молдингов при замене"],
  [("Можно ли отремонтировать скол или нужна замена?","Небольшой скол обычно ремонтируется, если он не в зоне обзора водителя и не у края стекла. В остальных случаях стекло меняют."),
   ("Можно ли ехать сразу после замены?","Время полимеризации клея зависит от условий. Точное время ожидания назовём при работе."),
   ("Покрывает ли страховка повреждение стекла?","Во многих страховках стёкла покрываются. Условия уточните в своей страховой компании.")])),
("pdr-korikorjaukset","Korikorjaukset (PDR)","Кузовной ремонт (PDR)",
 ("PDR (Paintless Dent Repair) tarkoittaa lommon oikaisua ilman maalausta. Lommo painetaan takaisin muotoonsa erikoistyökaluilla, jolloin alkuperäinen maali säilyy. Korjaus on usein nopeampi ja edullisempi kuin perinteinen.",
  ["Pysäköintikolhut ja ovenreunojen lommot","Rakeiden aiheuttamat lommot","Painumat konepellissä, katossa ja lokasuojissa","Lommon arvio ennen työtä"],
  [("Sopiiko PDR kaikkiin lommoihin?","Ei. Menetelmä toimii, kun maali on ehjä eikä lommo ole liian jyrkkä tai terävä. Kerromme arvion rehellisesti, myös kun PDR ei sovi."),
   ("Vaurioituuko maali?","Ei, kun maali on ehjä. Pintaa ei maalata, joten alkuperäinen maali säilyy."),
   ("Kuinka kauan korjaus kestää?","Pieni lommo voi onnistua nopeasti. Tarkka aika selviää arvion yhteydessä.")]),
 ("PDR (Paintless Dent Repair) — удаление вмятин без покраски. Вмятину выправляют обратно специальными инструментами, поэтому родная краска остаётся. Часто это быстрее и дешевле обычного ремонта.",
  ["Парковочные вмятины и вмятины от дверей","Градовые вмятины","Вмятины на капоте, крыше и крыльях","Оценка вмятины перед работой"],
  [("Подходит ли PDR для любой вмятины?","Нет. Метод работает, если краска цела, а вмятина не слишком резкая или острая. Честно скажем, если PDR не подходит."),
   ("Повреждается ли краска?","Нет, если она цела. Поверхность не красят, поэтому родное покрытие сохраняется."),
   ("Сколько занимает ремонт?","Небольшая вмятина может устраняться быстро. Точное время скажем после оценки.")])),
("kiillotus-ja-keraaminen-pinnoitus","Kiillotus & keraaminen pinnoitus","Полировка и керамика",
 ("Kiillotus poistaa maalipinnasta hienot naarmut, himmeyden ja haalistumisen. Keraaminen pinnoite suojaa puhdistetun pinnan pitkäksi aikaa ja helpottaa pesua.",
  ["Korin kiillotus","Ajovalojen kiillotus","Keraaminen pinnoitus","Pinnan esipesu ja valmistelu"],
  [("Poistaako kiillotus kaikki naarmut?","Ei aina. Pinnalliset naarmut häviävät. Syvät, kynnellä tuntuvat naarmut vaativat usein paikkamaalauksen. Arvioimme tilanteen ennen työtä."),
   ("Kauanko keraaminen pinnoite kestää?","Kesto riippuu tuotteesta, auton käytöstä ja hoidosta. Kerromme valittavan pinnoitteen keston ennen työtä."),
   ("Tarvitseeko pinnoitettu auto erityishoitoa?","Pese auto pehmeästi käsin tai kosketuksettomasti. Vältä karkeita harjoja.")]),
 ("Полировка убирает с лакокрасочного покрытия мелкие царапины, матовость и выцветание. Керамическое покрытие надолго защищает очищенную поверхность и облегчает мойку.",
  ["Полировка кузова","Полировка фар","Керамическое покрытие","Предварительная мойка и подготовка поверхности"],
  [("Убирает ли полировка все царапины?","Не всегда. Поверхностные царапины уходят. Глубокие, которые цепляет ноготь, часто требуют локальной покраски. Оцениваем до начала работ."),
   ("Как долго держится керамика?","Срок зависит от состава, эксплуатации и ухода. Перед работой скажем, на сколько рассчитано выбранное покрытие."),
   ("Нужен ли особый уход за покрытием?","Мойте мягко вручную или бесконтактно. Избегайте жёстких щёток.")])),
("ruostekorjaus-ja-paikkamaalaus","Ruostekorjaus ja paikkamaalaus","Ремонт ржавчины и локальная покраска",
 ("Ruoste leviää, jos sitä ei korjata ajoissa. Poistamme ruostevaurion, käsittelemme pinnan ja maalaamme korjatun kohdan auton väriin.",
  ["Ruosteen poisto ja käsittely","Paikkamaalaus","Osan maalaus","Naarmujen ja kiveniskemien korjaus"],
  [("Voiko ruosteen pysäyttää?","Pinnallinen ruoste voidaan poistaa ja pinta suojata. Jos pelti on jo puhki, tarvitaan yleensä peltikorjaus. Katsomme tilanteen ja kerromme vaihtoehdot."),
   ("Sopiiko väri täsmälleen?","Sävy sovitetaan auton väriin. Vanhassa maalissa voi näkyä pieni ero, koska maali haalistuu ajan myötä."),
   ("Kannattaako ruoste korjata heti?","Kyllä. Ruoste etenee, ja korjaus on sitä edullisempi, mitä aikaisemmin se tehdään.")]),
 ("Ржавчина распространяется, если не устранить её вовремя. Убираем очаг коррозии, обрабатываем поверхность и красим участок в цвет автомобиля.",
  ["Удаление ржавчины и обработка","Локальная покраска","Покраска детали","Устранение царапин и сколов"],
  [("Можно ли остановить ржавчину?","Поверхностную ржавчину можно удалить и защитить металл. Если металл уже прогнил насквозь, нужен кузовной ремонт. Осмотрим и предложим варианты."),
   ("Цвет совпадёт точно?","Оттенок подбирается под цвет автомобиля. На старой краске возможна небольшая разница: со временем краска выгорает."),
   ("Стоит ли ремонтировать ржавчину сразу?","Да. Ржавчина прогрессирует, и чем раньше ремонт, тем он дешевле.")])),
("sisapesu-ja-detailing","Sisäpesut ja detailing","Химчистка салона и детейлинг",
 ("Perusteellinen sisäpuhdistus ja detailing palauttavat auton siistin ilmeen. Puhdistamme istuimet, matot, muovit ja lasit ja kohdistamme työn siihen, mitä auto oikeasti tarvitsee.",
  ["Sisäpesu ja imurointi","Penkkien ja mattojen syväpuhdistus","Nahkojen puhdistus ja hoito","Muovien ja lasien viimeistely","Täysi detailing sisältä ja ulkoa"],
  [("Lähteekö tahra varmasti pois?","Useimmat tahrat lähtevät. Vanhat tai voimakkaasti värjäävät tahrat (kahvi, rasva, muste) eivät aina. Arvioimme tahran ennen työtä."),
   ("Kauanko penkit kuivuvat?","Kuivumisaika riippuu materiaalista ja menetelmästä. Kerromme sen luovutuksen yhteydessä."),
   ("Hoidatteko nahkaistuimet?","Kyllä, puhdistamme ja hoidamme nahkapinnat.")]),
 ("Тщательная химчистка салона и детейлинг возвращают автомобилю опрятный вид. Чистим сиденья, коврики, пластик и стёкла, сосредотачиваясь на том, что автомобилю действительно нужно.",
  ["Уборка и пылесос салона","Глубокая чистка сидений и ковриков","Чистка и уход за кожей","Финишная обработка пластика и стёкол","Комплексный детейлинг салона и кузова"],
  [("Точно ли отойдёт пятно?","Большинство пятен отходит. Старые или сильно красящие (кофе, жир, чернила) — не всегда. Оценим пятно до работы."),
   ("Сколько сохнут сиденья?","Время высыхания зависит от материала и метода. Скажем при выдаче автомобиля."),
   ("Ухаживаете за кожаными сиденьями?","Да, чистим и обрабатываем кожаные поверхности.")])),
("autojen-teippaukset","Autojen teippaukset","Оклейка автомобилей",
 ("Teippaus muuttaa auton ilmeen ja suojaa maalia. Teemme koko auton ja osien teippaukset sekä värinmuutokset, ja valitsemme sävyn ja kalvon yhdessä kanssasi.",
  ["Koko auton teippaus","Osateippaus: katto, konepelti, peilit","Värinmuutos","Suunnittelu ja värivalinta yhdessä"],
  [("Vaurioittaako teippi maalia?","Laadukas kalvo ei vaurioita ehjää alkuperäistä maalia. Aiemmin maalattu tai vaurioitunut pinta voi irrota kalvon mukana."),
   ("Kauanko teippaus kestää?","Kestoikä riippuu kalvon laadusta, auton käytöstä ja hoidosta."),
   ("Miten teipattua autoa pestään?","Käsin tai kosketuksettomasti. Vältä painepesurin suoraa suihkua reunoihin ja harjapesua.")]),
 ("Оклейка меняет внешний вид автомобиля и защищает краску. Делаем полную и частичную оклейку, смену цвета, оттенок и плёнку выбираем вместе с вами.",
  ["Полная оклейка автомобиля","Частичная оклейка: крыша, капот, зеркала","Смена цвета","Подбор цвета и плёнки вместе с вами"],
  [("Повреждает ли плёнка краску?","Качественная плёнка не повреждает целую родную краску. Ранее перекрашенная или повреждённая поверхность может отойти вместе с плёнкой."),
   ("Сколько служит оклейка?","Срок зависит от качества плёнки, эксплуатации и ухода."),
   ("Как мыть оклеенный автомобиль?","Вручную или бесконтактно. Не направляйте струю мойки высокого давления на края и не используйте щёточную мойку.")])),
("suojakalvot","Suojakalvot","Защитные плёнки",
 ("Suojakalvo (PPF) on läpinäkyvä kalvo, joka suojaa maalia kiviltä, hiekalta ja naarmuilta. Se on erityisen hyödyllinen auton etuosassa, jossa iskuja tulee eniten.",
  ["Etuosan suojaus: puskuri, konepelti, lokasuojat, peilit","Koko auton suojakalvo","Yksittäiset osat, esim. kynnykset ja ovenkahvojen alustat"],
  [("Näkyykö kalvo?","Laadukas kalvo on lähes huomaamaton eikä muuta maalin sävyä."),
   ("Voiko kalvon asentaa vanhaan autoon?","Kyllä, kunhan maali on ehjä. Pinta puhdistetaan ja tarvittaessa kiillotetaan ennen asennusta."),
   ("Miten kalvoa hoidetaan?","Pese säännöllisesti ja pehmeästi. Vältä voimakkaita liuottimia.")]),
 ("Защитная плёнка (PPF) — прозрачное покрытие, которое защищает краску от камней, песка и царапин. Особенно полезна на передней части автомобиля, где больше всего ударов.",
  ["Защита передней части: бампер, капот, крылья, зеркала","Полная защита автомобиля плёнкой","Отдельные элементы, например пороги и ниши ручек"],
  [("Видна ли плёнка?","Качественная плёнка почти незаметна и не меняет оттенок краски."),
   ("Можно ли поклеить на старый автомобиль?","Да, если краска цела. Перед установкой поверхность очищают и при необходимости полируют."),
   ("Как ухаживать за плёнкой?","Мойте регулярно и мягко. Избегайте агрессивных растворителей.")])),
]

CONTENT, EN = apply(CONTENT, EN)
NOTES_ = NOTES
WORKS_STYLE = {"vauriokorjaukset": ' style="--cardar:3/4"'}   # одинаковые портретные рамки 3:4
WORKS_FOR = {"kiillotus-ja-keraaminen-pinnoitus": ["lights", "polish", "polish2"], "pdr-korikorjaukset": ["gclass"],
             "autohuolto-ja-korjaus": ["shock", "rr"], "tuulilasien-vaihto": ["glass", "glass2"], "sisapesu-ja-detailing": ["clean"], "vauriokorjaukset": ["pdr1", "pdr2", "pdr3"]}
PHOTOS = '''<div class="photos">
        <div class="ph"><img src="img/@@SLUG@@-1.webp" alt="" loading="lazy"></div>
        <div class="ph"><img src="img/@@SLUG@@-2.webp" alt="" loading="lazy"></div>
      </div>'''
ICO = lambda n: f'<span class="ic big" data-ico="{n}"></span>'
def LP(fi, ru, en):  # абзацы: "\n\n" делит текст на несколько <p>
    return "".join("".join(f'<p data-l="{k}">{x}</p>' for x in v.split("\n\n")) for k, v in (("fi", fi), ("ru", ru), ("en", en)))
def L(fi, ru, en, tag="span"): return "".join(f'<{tag} data-l="{k}">{v}</{tag}>' for k, v in (("fi", fi), ("ru", ru), ("en", en)))

T = open(os.path.join(os.path.dirname(__file__), "page_template.html"), encoding="utf-8").read()

for n, (slug, tfi, tru, fi, ru) in enumerate(CONTENT):
    et, ei, eit, efq = EN[slug]
    items = "".join(f"<li>{L(a, b, c)}</li>" for a, b, c in zip(fi[1], ru[1], eit))
    faq = "".join(f'<details class="reveal"><summary>{L(a[0], b[0], c[0])}</summary><p>{L(a[1], b[1], c[1])}</p></details>'
                  for a, b, c in zip(fi[2], ru[2], efq))
    more = "".join(f'<a href="{s}.html">{L(a, b, EN[s][0])}</a>' for s, a, b, *_ in CONTENT if s != slug)
    ld = json.dumps({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in fi[2]]}, ensure_ascii=False)
    html = (T.replace("@@TFI@@", tfi).replace("@@DESC@@", fi[0].split(". ")[0].replace('"', "&quot;") + ".")
             .replace("@@ICON@@", ICO(n)).replace("@@H1@@", L(tfi, tru, et)).replace("@@INTRO@@", LP(fi[0], ru[0], ei))
             .replace("@@ITEMS@@", items).replace("@@FAQ@@", faq).replace("@@MORE@@", more).replace("@@LD@@", ld)
             .replace("@@PHOTOS@@", "" if slug in WORKS_FOR else PHOTOS)
             .replace("@@WORKS@@", ("<section class=\"sec sp-works\"><h2>" + L("Esimerkkejä töistämme", "Примеры наших работ", "Examples of our work") + "</h2><div class=\"works pw\"" + WORKS_STYLE.get(slug, "") + ">"
                                    + "".join(f'<div data-work="{k}"></div>' for k in WORKS_FOR[slug]) + "</div></section>") if slug in WORKS_FOR else "")
             .replace("@@NOTE@@", L(*[x.replace("\n", "<br>") for x in NOTES_.get(slug, DEFAULT_NOTE)]))
             .replace("@@EXTRA@@", ('<div class="mats"><b>' + L("Materiaalit", "Материалы", "Materials") + "</b><p>" + L(*EXTRAS_TEXT[slug]) + '</p><a href="https://42shield.com/" target="_blank" rel="noopener">42shield.com</a></div>') if slug in EXTRAS_TEXT else "")
             .replace("@@PRICES@@", f'<div data-prices="{slug}"></div>')
             .replace("@@SLUG@@", slug))
    open(os.path.join(OUT, slug + ".html"), "w", encoding="utf-8").write(html)
print("pages:", len(CONTENT))

# ---- sitemap.xml and robots.txt
import datetime
SITE = "https://kori-kunto.fi"
today = datetime.date.today().isoformat()
urls = [SITE + "/"] + [f"{SITE}/{c[0]}.html" for c in CONTENT]
open(os.path.join(OUT, "sitemap.xml"), "w", encoding="utf-8").write(
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + "".join(f"  <url><loc>{u}</loc><lastmod>{today}</lastmod></url>\n" for u in urls) + "</urlset>\n")
open(os.path.join(OUT, "robots.txt"), "w", encoding="utf-8").write(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")
print("sitemap urls:", len(urls))

for old in ("ruostekorjaus-ja-paikkamaalaus",):
    p = os.path.join(OUT, old + ".html")
    if os.path.exists(p): os.remove(p)

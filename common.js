/* Общее для всех страниц: иконки, анимация появления, форма бронирования, плавающая кнопка */
(function () {
  /* ===== НАСТРОЙКА ФОРМЫ =====
     Пока endpoint пустой, форма откроет почтовую программу с готовым письмом на korikunto@gmail.com.
     Чтобы заявки приходили сами, вставьте адрес сервиса (см. README.md):
       Web3Forms: endpoint "https://api.web3forms.com/submit"  и key "ваш-ключ"
       Formspree: endpoint "https://formspree.io/f/xxxxxxx"     и key оставить пустым */
  const FORM = { endpoint: "https://api.web3forms.com/submit", key: "75b53069-8824-4091-9e8c-65bf69538597" };

  const B = {
    fi: { t:"Varaa aika", sub:"Toivottu aika – vahvistamme sen puhelimitse tai sähköpostilla.", sv:"Palvelu", other:"Muu / en tiedä", d:"Päivä", tm:"Kellonaika", pl:"Rekisterinumero", nm:"Nimi / yritys", ph:"Puhelin", em:"Sähköposti", cm:"Lisätietoja", send:"Lähetä", wait:"Lähetetään…", pick:"Valitse",
      ok:"Kiitos! Otamme yhteyttä ja vahvistamme ajan.", err:"Lähetys ei onnistunut. Soita 040 867 6722 tai lähetä sähköposti: korikunto@gmail.com.", cons:"Lähettämällä lomakkeen hyväksyt, että käytämme tietojasi yhteydenottoon.", pp:"Tietosuoja", mailto:"Avataan sähköpostiohjelma…" },
    ru: { t:"Забронировать время", sub:"Желаемое время — подтвердим по телефону или почте.", sv:"Услуга", other:"Другое / не знаю", d:"Дата", tm:"Время", pl:"Номер авто", nm:"Имя / компания", ph:"Телефон", em:"E-mail", cm:"Комментарий", send:"Отправить", wait:"Отправляем…", pick:"Выберите",
      ok:"Спасибо! Мы свяжемся с вами и подтвердим время.", err:"Не удалось отправить. Позвоните 040 867 6722 или напишите на korikunto@gmail.com.", cons:"Отправляя форму, вы соглашаетесь на использование данных для связи с вами.", pp:"Политика конфиденциальности", mailto:"Открываем почтовую программу…" },
    en: { t:"Book a time", sub:"Your preferred time – we will confirm it by phone or email.", sv:"Service", other:"Other / not sure", d:"Date", tm:"Time", pl:"Registration number", nm:"Name / company", ph:"Phone", em:"Email", cm:"Comments", send:"Send", wait:"Sending…", pick:"Select",
      ok:"Thank you! We will contact you and confirm the time.", err:"Sending failed. Call 040 867 6722 or email korikunto@gmail.com.", cons:"By submitting the form you agree that we use your details to contact you.", pp:"Privacy policy", mailto:"Opening your email app…" }
  };
  const IDX = { fi: 0, ru: 1, en: 2 };
  const lng = () => (B[document.documentElement.lang] ? document.documentElement.lang : "fi");
  const slots = []; for (let h = 8; h <= 16; h++) slots.push((h < 10 ? "0" : "") + h + ":00");

  document.documentElement.classList.add("js");
  document.querySelectorAll("[data-ico]").forEach(e => { e.innerHTML = ico(+e.dataset.ico); });
  document.querySelectorAll("[data-work]").forEach(e => { e.outerHTML = workHTML(e.dataset.work); });
  document.querySelectorAll("[data-prices]").forEach(e => { const h = priceListHTML(e.dataset.prices); if (h) e.outerHTML = h; else e.remove(); });
  document.querySelectorAll("[data-pricegrid]").forEach(e => { e.outerHTML = priceGridHTML(); });

  /* ----- убираем пустые рамки: если файла-фото нет, рамка исчезает ----- */
  const drop = img => {
    const ph = img.closest(".ph"); if (!ph) return;
    const wk = ph.closest(".work"), box = ph.parentElement; ph.remove();
    if (box && /photos|gal|pair/.test(box.className) && !box.querySelector(".ph")) box.remove();
    if (wk && !wk.querySelector(".ph,.ba")) wk.remove();
  };
  document.querySelectorAll(".ph img").forEach(img => { if (img.complete && img.naturalWidth === 0) drop(img); else img.addEventListener("error", () => drop(img)); });

  /* ----- видео: грузится, когда доскроллили; без звука, по кругу; клик = пауза ----- */
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("video[data-src]").forEach(v => {
    const start = () => { v.src = v.dataset.src; v.load(); if (still) v.controls = true; else v.play().catch(() => { v.controls = true; }); };
    if ("IntersectionObserver" in window) new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { o.disconnect(); start(); } }, { rootMargin: "200px" }).observe(v); else start();
    v.parentElement.addEventListener("click", () => { if (v.controls) return; v.paused ? v.play() : v.pause(); });
  });

  /* ----- слайдеры «до/после» ----- */
  document.querySelectorAll("[data-ba]").forEach(ba => {
    const inp = ba.querySelector("input"), set = v => { ba.style.setProperty("--p", v + "%"); inp.value = v; };
    inp.addEventListener("input", () => { ba.dataset.t = "1"; set(inp.value); });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    new IntersectionObserver((en, o) => { if (!en[0].isIntersecting) return; o.disconnect();
      const t0 = performance.now(), D = 2200;
      (function f(t) { if (ba.dataset.t) return; const k = Math.min(1, (t - t0) / D); set(50 + 30 * Math.sin(k * 6.283)); if (k < 1) requestAnimationFrame(f); else set(50); })(t0);
    }, { threshold: .6 }).observe(ba);
  });

  /* ----- анимация появления при прокрутке ----- */
  const els = document.querySelectorAll(".sec h2,.sp-hero>*,.sp-body>*,.steps li,.atext,.facts,.grid .sv,.pair,.faq details,.bar,.more,.rvw,.work,.pc,.prices,.mats");
  els.forEach((e, i) => { e.classList.add("reveal"); e.style.transitionDelay = (i % 5) * 60 + "ms"; });
  if (!("IntersectionObserver" in window)) els.forEach(e => e.classList.add("in"));
  else {
    const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .1 });
    els.forEach(e => io.observe(e));
  }

  /* ----- окно бронирования ----- */
  const dlg = document.createElement("dialog");
  dlg.id = "book";
  dlg.innerHTML = `<button class="x" type="button" aria-label="Close">×</button>
  <h3 data-b="t"></h3><p class="sub" data-b="sub"></p>
  <form id="bf">
    <label class="f1"><span data-b="sv" data-req></span><select name="service" required></select></label>
    <label><span data-b="d" data-req></span><input type="date" name="date" required></label>
    <label><span data-b="tm" data-req></span><select name="time" required></select></label>
    <label><span data-b="pl"></span><input name="plate" autocomplete="off" maxlength="12"></label>
    <label><span data-b="nm" data-req></span><input name="name" autocomplete="name" required></label>
    <label><span data-b="ph" data-req></span><input type="tel" name="phone" autocomplete="tel" required></label>
    <label><span data-b="em"></span><input type="email" name="email" autocomplete="email"></label>
    <label class="f1"><span data-b="cm"></span><textarea name="comment" rows="3"></textarea></label>
    <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <p class="note f1"><span data-b="cons"></span> <a href="#privacy" data-priv data-b="pp"></a></p>
    <button class="btn red f1" type="submit"></button>
    <p class="fs f1" role="status"></p>
  </form>`;
  document.body.appendChild(dlg);
  const form = dlg.querySelector("form"), st = dlg.querySelector(".fs");

  function fill() {
    const l = lng(), b = B[l], sv = form.service, ti = form.time, c1 = sv.value, c2 = ti.value;
    dlg.querySelectorAll("[data-b]").forEach(e => { e.textContent = b[e.dataset.b] + (e.hasAttribute("data-req") ? " *" : ""); });
    sv.innerHTML = `<option value="">${b.pick}</option>` + SVN.map((s, i) => `<option value="${i}">${s[IDX[l]]}</option>`).join("") + `<option value="x">${b.other}</option>`;
    ti.innerHTML = `<option value="">${b.pick}</option>` + slots.map(t => `<option>${t}</option>`).join("");
    sv.value = c1; ti.value = c2;
    form.querySelector("[type=submit]").textContent = b.send;
  }
  function openBook() {
    fill();
    form.date.min = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
    const i = SLUGS.findIndex(s => location.pathname.endsWith(s + ".html"));
    if (i >= 0 && !form.service.value) form.service.value = String(i);
    st.textContent = ""; st.className = "fs";
    dlg.showModal();
  }
  document.addEventListener("click", e => { if (e.target.closest("[data-priv]")) { dlg.close(); const p = document.getElementById("privacy"); if (p) p.open = true; } });
  document.addEventListener("click", e => { if (e.target.closest("[data-book]")) { e.preventDefault(); openBook(); } });
  dlg.querySelector(".x").onclick = () => dlg.close();
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

  form.onsubmit = async e => {
    e.preventDefault();
    const l = lng(), b = B[l], btn = form.querySelector("[type=submit]");
    if (form.botcheck.checked) return;
    const d = Object.fromEntries(new FormData(form)); delete d.botcheck;
    d.service = d.service === "x" ? b.other : SVN[+d.service][0];
    d.subject = "Kori Kunto – varaus / booking: " + d.service; d.from_name = "Kori Kunto website"; d.language = l; d.page = location.href;
    if (!FORM.endpoint) {
      const body = ["service", "date", "time", "plate", "name", "phone", "email", "comment"].map(k => k + ": " + (d[k] || "")).join("\n");
      st.className = "fs ok"; st.textContent = b.mailto;
      location.href = "mailto:korikunto@gmail.com?subject=" + encodeURIComponent(d.subject) + "&body=" + encodeURIComponent(body);
      return;
    }
    btn.disabled = true; st.className = "fs"; st.textContent = b.wait;
    try {
      const r = await fetch(FORM.endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(FORM.key ? Object.assign({ access_key: FORM.key }, d) : d) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.success === false) throw 0;
      st.className = "fs ok"; st.textContent = b.ok; form.reset();
    } catch (x) { st.className = "fs bad"; st.textContent = b.err; }
    btn.disabled = false;
  };

  /* ----- политика конфиденциальности (раскрывающийся блок в подвале) ----- */
  const PRIV = [
    [["Tietosuoja","Политика конфиденциальности","Privacy policy"]],
    [["Rekisterinpitäjä","Ответственный за данные","Data controller"],["KoriKunto Oy (Y-tunnus 3477450-6), Tillinmäentie 3 B117, 02330 Espoo, korikunto@gmail.com, 040 867 6722.","KoriKunto Oy (Y-tunnus 3477450-6), Tillinmäentie 3 B117, 02330 Espoo, korikunto@gmail.com, 040 867 6722.","KoriKunto Oy (business ID 3477450-6), Tillinmäentie 3 B117, 02330 Espoo, korikunto@gmail.com, +358 40 867 6722."]],
    [["Mitä tietoja keräämme","Какие данные мы собираем","What data we collect"],["Varauslomakkeella antamasi tiedot: nimi, puhelinnumero, sähköposti, rekisterinumero, palvelu, toivottu aika ja lisätiedot.","Данные, которые вы указываете в форме бронирования: имя, телефон, e-mail, номер автомобиля, услуга, желаемое время и комментарий.","The details you enter in the booking form: name, phone number, email, registration number, service, preferred time and comments."]],
    [["Käyttötarkoitus","Для чего используем","Why we use it"],["Varauksen käsittelyyn ja yhteydenottoon. Perusteena on sopimuksen valmistelu ja oikeutettu etu vastata yhteydenottoosi.","Для обработки бронирования и связи с вами. Основание — подготовка договора и законный интерес ответить на ваше обращение.","To handle your booking and contact you. The basis is preparing a contract and our legitimate interest in answering your enquiry."]],
    [["Tietojen luovutus","Передача данных","Sharing"],["Lomaketiedot välitetään sähköpostiimme Web3Forms-lomakepalvelun kautta (palveluntarjoaja käsittelee tietoja puolestamme). Emme myy tietoja.","Данные формы передаются на нашу почту через сервис форм Web3Forms (поставщик обрабатывает данные по нашему поручению). Мы не продаём данные.","Form data is delivered to our email through the Web3Forms form service (the provider processes data on our behalf). We do not sell data."]],
    [["Säilytys","Хранение","Retention"],["Säilytämme tietoja vain niin kauan kuin asian hoitaminen ja lakisääteiset velvoitteet vaativat.","Мы храним данные только пока это нужно для выполнения заказа и требований закона.","We keep data only as long as needed to handle the matter and meet legal obligations."]],
    [["Oikeutesi","Ваши права","Your rights"],["Voit pyytää pääsyä tietoihisi, niiden oikaisua tai poistoa sekä rajoittaa tai vastustaa käsittelyä: korikunto@gmail.com. Voit tehdä valituksen tietosuojavaltuutetulle (tietosuoja.fi).","Вы можете запросить доступ к своим данным, их исправление или удаление, ограничить обработку или возразить против неё: korikunto@gmail.com. Можно подать жалобу уполномоченному по защите данных (tietosuoja.fi).","You can request access to your data, correction or deletion, and restrict or object to processing: korikunto@gmail.com. You may also complain to the Data Protection Ombudsman (tietosuoja.fi)."]],
    [["Evästeet","Cookies","Cookies"],["Sivusto ei käytä seuranta- tai mainosevästeitä. Selain muistaa vain valitsemasi kielen. Arvostelut tulevat AutoJerry.fi-palvelusta; niistä näytetään etunimi ja sukunimen alkukirjain.","Сайт не использует cookies для слежения и рекламы. Браузер запоминает только выбранный язык. Отзывы взяты с AutoJerry.fi; показываются имя и первая буква фамилии.","The site does not use tracking or advertising cookies. Your browser only remembers the language you chose. Reviews come from AutoJerry.fi; only the first name and the initial of the surname are shown."]]
  ];
  const ft = document.querySelector("footer");
  if (ft) {
    const d = document.createElement("details"); d.id = "privacy"; d.className = "priv";
    d.innerHTML = `<summary>${L3(...PRIV[0][0])}</summary>` + PRIV.slice(1).map(([t, x]) => `<p><b>${L3(...t)}:</b> ${L3(...x)}</p>`).join("");
    ft.insertBefore(d, ft.firstChild);
  }

  /* ----- плавающая кнопка (на телефоне) ----- */
  const fab = document.createElement("button");
  fab.className = "fab"; fab.type = "button"; fab.setAttribute("data-book", "");
  fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg><span></span>';
  document.body.appendChild(fab);
  const refresh = () => { fab.lastChild.textContent = B[lng()].t; };
  refresh();
  document.addEventListener("click", e => { if (e.target.closest("[data-lang]")) setTimeout(refresh, 0); });
})();

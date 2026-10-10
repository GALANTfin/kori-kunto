/* ===== ИКОНКИ (линейные, красные) ===== */
const ICONS = [
  '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  '<path d="M3 8c6-3 12-3 18 0l-1.6 8.5c-5.2-1.6-10.6-1.6-15.8 0z"/><path d="M11 10l1.8 2.4-1.6 1.8"/>',
  '<path d="M3 16v-3l1.7-4.2A2 2 0 0 1 6.5 7.5h11a2 2 0 0 1 1.8 1.3L21 13v3z"/><circle cx="7.5" cy="17.5" r="1.7"/><circle cx="16.5" cy="17.5" r="1.7"/><path d="M3 12.5h18"/>',
  '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>',
  '<rect x="8" y="9" width="8" height="12" rx="1.5"/><path d="M10 9V6h4v3M11 4h2M18 6h2M18 9l2 1M18 3l2-1"/>',
  '<path d="M8 3h4.5A2.5 2.5 0 0 1 15 5.5L15.6 13H8z"/><path d="M8 13l-1 5h11l-1-5M7 21h12M12 18v3"/>',
  '<circle cx="10" cy="12" r="7"/><circle cx="10" cy="12" r="2.5"/><path d="M17 12h4v6h-8"/>',
  '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9 15a3 3 0 0 0 3 3"/>',
  '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.2"/>'
];
const ico = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n].replace(/<(path|circle|rect)/g, '<$1 pathLength="1"')}</svg>`;

const SLUGS = ["autohuolto-ja-korjaus","tuulilasien-vaihto","pdr-korikorjaukset","kiillotus-ja-keraaminen-pinnoitus","vauriokorjaukset","sisapesu-ja-detailing","autojen-teippaukset","suojakalvot"];
/* service names: [fi, ru, en] */
const SVN = [
  ["Autohuolto ja korjaus","Обслуживание и ремонт авто","Servicing and repair"],
  ["Tuulilasin vaihto","Замена лобовых стёкол","Windscreen replacement"],
  ["Korikorjaukset (PDR)","Кузовной ремонт (PDR)","Body repair (PDR)"],
  ["Kiillotus & keraaminen pinnoitus","Полировка и керамика","Polishing & ceramic coating"],
  ["Vauriokorjaukset","Ремонт повреждений","Damage repairs"],
  ["Sisäpesut ja detailing","Химчистка салона и детейлинг","Interior cleaning & detailing"],
  ["Autojen teippaukset","Оклейка автомобилей","Car wrapping"],
  ["Suojakalvot","Защитные плёнки","Protective films"],
];

/* ===== РАБОТЫ: слайдеры «до/после» (s), пары рядом (p), галереи (g) ===== */
const L3 = (a, b, c) => `<span data-l="fi">${a}</span><span data-l="ru">${b}</span><span data-l="en">${c}</span>`;
const WORKS = {
  polish: { t:"s", img:"ba-polish", cap:["Ajovalojen kiillotus","Полировка фар","Headlight polishing"] },
  shock:  { t:"s", img:"ba-shock",  cap:["Iskunvaimentimen vaihto","Замена амортизатора","Shock absorber replacement"] },
  pdr1:   { t:"s", img:"ba-paint1", ar:"3/4", cap:["Paikkamaalaus","Точечная покраска","Spot painting"] },
  pdr2:   { t:"s", img:"ba-paint2", ar:"780/1372",maxw:"400px", cap:["Paikkamaalaus","Точечная покраска","Spot painting"] },
  pdr3:   { t:"s", img:"ba-paint3", ar:"3/4", cap:["Paikkamaalaus","Точечная покраска","Spot painting"] },
  lights: { t:"s", wide:true, img:"ba-lights", ar:"1000/483", cap:["Ajovalojen kiillotus","Полировка фар","Headlight polishing"] },
  clean:  { t:"v", src:"video/sisapesu.mp4", poster:"img/sisapesu-poster.webp", ar:"640/1114", maxw:"380px", cap:["Auton sisäpesu","Чистка салона","Interior cleaning"] },
  glass:  { t:"g", span:3, ar:"4/3", imgs:["tuulilasien-vaihto-1"], cap:["Tuulilasin vaihto","Замена лобового стекла","Windscreen replacement"] },
  glass2: { t:"g", span:3, ar:"1/1", cols:2, imgs:["glass2-1","glass2-2","glass2-3","glass2-4"], cap:["Tuulilasin vaihto työn alla","Замена лобового стекла в процессе","Windscreen replacement in progress"] },
  gclass: { t:"g", span:3, ar:"3/4", cols:2, imgs:["gclass-1","gclass-2","gclass-3","gclass-4"], cap:["Lommojen oikaisu (PDR)","Удаление вмятин (PDR)","Dent removal (PDR)"] },
  polish2:{ t:"g", span:3, ar:"3/4", cols:2, imgs:["polish2-1","polish2-2","polish2-3","polish2-4"], cap:["Kiillotus ja pinnan viimeistely","Полировка и финишная обработка","Polishing and finishing"] },
  team:   { t:"g", span:6, ar:"3/4", cols:2, imgs:["team-1","team-2"], cap:null },
  rr:     { t:"g", wide:true, span:4, ar:"3/4", imgs:["rr-1","rr-2","rr-3"], cap:["Range Rover – imusarjan vaihto","Range Rover — замена впускного коллектора","Range Rover – intake manifold replacement"] }
};
const WORK_ORDER = ["polish", "shock", "gclass", "glass", "polish2"];
function workHTML(k) {
  const w = WORKS[k], alt = w.cap ? w.cap[0] : "Kori Kunto";
  let body;
  if (w.t === "s") body = `<div class="ba" data-ba style="--p:50%;--ar:${w.ar || "1/1"}"><img class="a" src="img/${w.img}-after.webp" alt="${alt} – jälkeen" loading="lazy"><img class="b" src="img/${w.img}-before.webp" alt="${alt} – ennen" loading="lazy"><em class="lb l">${L3("Ennen","До","Before")}</em><em class="lb r">${L3("Jälkeen","После","After")}</em><i class="hd"></i><input type="range" min="0" max="100" value="50" aria-label="Before / After"></div>`;
  else if (w.t === "v") body = `<div class="vid" style="--ar:${w.ar}"><video muted loop playsinline preload="none" poster="${w.poster}" data-src="${w.src}" aria-label="${alt}"></video></div>`;
  else if (w.t === "p") body = `<div class="pair">${[["before","Ennen","До","Before"],["after","Jälkeen","После","After"]].map(([s,a,b,c]) =>
    `<div class="ph"><img src="img/${w.img}-${s}.webp" alt="${alt} – ${a.toLowerCase()}" loading="lazy"><em>${L3(a,b,c)}</em></div>`).join("")}</div>`;
  else body = `<div class="gal" style="--n:${w.imgs.length};--c:${w.cols || w.imgs.length};--ar:${w.ar}">${w.imgs.map(i =>
    `<div class="ph"><img src="img/${i}.webp" alt="${alt}" loading="lazy"></div>`).join("")}</div>`;
  return `<figure class="work"${w.wide ? " data-wide" : ""} data-span="${w.t === "s" || w.t === "v" ? 3 : w.t === "p" ? 2 : (w.span || 3)}"${w.maxw ? ` style="max-width:${w.maxw};margin-inline:auto"` : ""}>${body}${w.cap ? `<figcaption>${L3(...w.cap)}</figcaption>` : ""}</figure>`;
}

/* ===== ЦЕНЫ (меняйте числа здесь) =====  [название fi, ru, en, цена fi, ru, en] */
const PRICE_ITEMS = {
  labour:  ["Työtunti","Час работы","Labour per hour","95 €/h","95 €/ч","€95/h"],
  glass:   ["Tuulilasin vaihto","Замена лобового стекла","Windscreen replacement","150 €","150 €","€150"],
  calib:   ["Kalibrointi (lisäksi)","Калибровка (дополнительно)","Calibration (additional)","120 €","120 €","€120"],
  clean:   ["Kevyt sisäsiivous (roskat ja pöly)","Лёгкая уборка салона (мусор и пыль)","Light interior clean (rubbish and dust)","40 €","40 €","€40"],
  textile: ["Tekstiilipesu ja nahkojen käsittely","Текстильная мойка и обработка кожи","Textile wash and leather treatment","120 €","120 €","€120"],
  lights:  ["Ajovalojen kiillotus","Полировка фар","Headlight polishing","140 €","140 €","€140"],
  ceramic: ["Keraaminen pinnoitus","Керамическое покрытие","Ceramic coating","alk. 350 €","от 350 €","from €350"]
};
const PRICES = {
  "autohuolto-ja-korjaus": ["labour"], "vauriokorjaukset": ["labour"], "tuulilasien-vaihto": ["glass", "calib"],
  "sisapesu-ja-detailing": ["clean", "textile"], "kiillotus-ja-keraaminen-pinnoitus": ["lights", "ceramic"]
};
const priceRow = k => { const p = PRICE_ITEMS[k]; return `<li><span>${L3(p[0], p[1], p[2])}</span><b>${L3(p[3], p[4], p[5])}</b></li>`; };
const priceListHTML = slug => PRICES[slug] ? `<h3 class="ph3">${L3("Hinnat","Цены","Prices")}</h3><ul class="prices">${PRICES[slug].map(priceRow).join("")}</ul><p class="vat">${L3("Hinnat sis. alv.","Цены включают НДС (sis. alv).","Prices include VAT (sis. alv).")}</p>` : "";
const priceGridHTML = () => `<div class="pgrid">${Object.keys(PRICE_ITEMS).map(k => { const p = PRICE_ITEMS[k];
  return `<div class="pc"><span>${L3(p[0], p[1], p[2])}</span><b>${L3(p[3], p[4], p[5])}</b></div>`; }).join("")}</div>`;

# Kori Kunto – сайт

Файлы: index.html (главная), 10 страниц услуг, style.css, script.js, shared.js, common.js, reviews.json, img/.

## Форма бронирования
Работает через Web3Forms: ключ и адрес уже вписаны в common.js (`const FORM`). Заявки приходят на почту, указанную при регистрации ключа на web3forms.com.

## Тексты страниц услуг
Правьте tools/build_pages.py (FI, RU) и tools/content_en.py (EN), затем: `python tools/build_pages.py`.

## Отзывы
GitHub Action (.github/workflows/reviews.yml) раз в сутки обновляет reviews.json с AutoJerry.

## Картинки (папка img, формат WebP, до ~250 КБ)
Уже есть: hero.webp, ba-polish / ba-shock (before+after, квадрат 1000×1000), ba-paint1…3 (before+after, квадрат 1000×1000), tuulilasien-vaihto-1, rr-1…3, logo*.png.
Заменить фото: положите файл с тем же именем. Номера авто на фото обязательно скрывайте.
Новые фото для остальных страниц: <название-страницы>-1.webp и -2.webp (1200×900).

## Домен
kori-kunto.fi. Если домен поменяется, исправьте SITE в tools/build_pages.py и в index.html (canonical, og:url, og:image), затем `python tools/build_pages.py`.

## Цены
Меняются в shared.js (блок PRICE_ITEMS): число и название на трёх языках. Показываются только на страницах услуг (на главной цен нет).

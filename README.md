# 3D PrintAll — sito web

Sito ufficiale di **3D PrintAll** (@3d_printall): stampa 3D e fai da te.

Sito statico (HTML/CSS/JS puro, nessun build step) pubblicato con **GitHub Pages**.

## Struttura

```
index.html        Pagina principale
css/style.css     Stili e animazioni
js/main.js        Interazioni (menu, contatori, animazione stampante, copia coupon)
assets/           Logo (SVG + PNG), immagine social
```

## Anteprima in locale

Apri `index.html` nel browser, oppure:

```bash
python -m http.server 8000
# poi vai su http://localhost:8000
```

## Pubblicazione

Ogni push sul branch `main` aggiorna il sito automaticamente
(Settings → Pages → Source: *Deploy from a branch* → `main` / root).

Icone dei brand: [Simple Icons](https://simpleicons.org) (CC0), incorporate in `index.html`.

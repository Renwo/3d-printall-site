# 3D PrintAll — sito web

Sito ufficiale di **3D PrintAll** (@3d_printall): stampa 3D e fai da te.

Sito statico (HTML/CSS/JS puro, nessun build step) pubblicato con **GitHub Pages**.

## Struttura

```
index.html        Pagina principale
app/index.html    Pagina dell'app 3D Cost Estimation
css/style.css     Stili e animazioni
css/fonts.css     Font ospitati in locale (nessuna richiesta a Google)
js/main.js        Interazioni (menu, contatori, animazione stampante, copia coupon)
js/i18n.js        Lingua: rilevamento IT/EN, selettore e traduzioni inglesi
assets/           Logo, immagine social, font e screenshot dell'app
```

## Lingue

Il testo italiano sta in `index.html`; le traduzioni inglesi in `js/i18n.js`.
Il sito è in italiano se il browser è impostato in italiano, altrimenti in inglese;
il selettore IT/EN in alto salva la scelta nel browser del visitatore.

Per aggiungere un testo traducibile:
1. in `index.html` aggiungi `data-i18n="chiave"` all'elemento (o `data-i18n-attr="alt:chiave"` per un attributo);
2. in `js/i18n.js` aggiungi `"chiave": "English text"` dentro `en`.

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

Privacy policy del sito: repository [3dprintall-legal](https://github.com/Renwo/3dprintall-legal), pagina `website/`.

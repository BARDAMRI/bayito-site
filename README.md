# Bayito public pages

Static pages for the app's privacy policy and data-deletion instructions (required by Facebook, Google and Apple).
Published with GitHub Pages from this repository. **The source of truth is the `site/` folder of the main Bayito repository**: edit it there
and run `npm run site:publish`; do not edit files here by hand.

- `terms.html`: terms of service (Hebrew and English)
- `privacy.html`: privacy policy (Hebrew and English)
- `data-deletion.html`: how to delete the account and data (Hebrew and English)
- `index.html`, `style.css`: landing page and styles

The site root (https://bayito.app/) is the landing page (`index.html`, made for visitors, partners and investors); the web version of the app lives at https://bayito.app/web/; `about.html` is the plain list of links. It is **built** from the client code by
`npm run site:publish -- --app` (and by `scripts/deploy-nas.sh`), not stored in the `site/` folder. Without a public API address it is a
development preview that runs without a server (no accounts, shop prices or assistant).

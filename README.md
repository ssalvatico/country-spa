# CountrySPA

A small atlas for exploring the countries of the world. Search by capital, by name or by continent, and open any result to read its profile: official name, population, languages, currencies, time zone, calling code, UN membership and more, alongside its flag.

The data comes from a public countries API. Results appear as you type, so you can move from "Tok" to Tokyo without pressing a button.

Built with Angular and Bootstrap.

## Getting started

Clone the repository and move into it:

```bash
git clone https://github.com/ssalvatico/country-spa.git
cd country-spa
```

Install the dependencies and copy the environment template:

```bash
npm install
cp src/environments/env.template.ts src/environments/env.ts
```

Fill `src/environments/env.ts` with your API URL and key, then start the app:

```bash
npm start
```

Open `http://localhost:4200/` in your browser.

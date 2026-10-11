# ZipFolio admin

The panel where a user builds their portfolio. They sign in with Google, fill
in their details, choose how each page looks, and publish.

Live: https://web-site-admin-xi.vercel.app (also https://admin.zipfolio.xyz)

## What it uses

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- GitHub Actions, Vercel

## What you can do in it

- **Structure:** name, description, links, skills and up to three tabs.
- **Content:** pick a layout for each tab and add up to five items to it.
- **Site Settings:** choose the site name (the subdomain) and light or dark.
- **Save and Publish:** sends everything to the backend; the public site shows it.

Sign-in goes through the backend: the button opens `/auth/google/login` on the
backend, Google asks the user to sign in, and the backend sends them back here
with a token.

## Run it locally

You need Node 20 and the backend running (see the backend README).

```bash
npm install
echo "VITE_API_URL_DEV=http://localhost:3000" > .env
npm run dev            # http://localhost:5173
```

For sign-in to return to your local admin, the backend's `ADMIN_URL` must be
`http://localhost:5173`.

Settings:

| Variable | Used when |
|---|---|
| `VITE_API_URL_DEV` | Running `npm run dev` |
| `VITE_API_URL_PROD` | Building for production; set in the Vercel project. Include `https://`. |

## Checks

```bash
npm run lint      # ESLint
npm run build     # type check (tsc) and production build
```

There are no automated tests in this repo, only lint and the build. The backend
has the tests.

## How it is checked and deployed

- **Every pull request:** GitHub Actions runs lint and the build. CodeQL scans
  the code.
- **Merge to `main`:** after those checks pass, GitHub Actions builds the app
  and deploys it to Vercel with the Vercel CLI. Vercel's own automatic deploys are
  turned off in `vercel.json`, so nothing reaches production without passing the checks.
- **`main` is protected:** changes go through a pull request, and the CI check
  must pass.
- **Dependabot** opens weekly pull requests for npm packages.

The deploy step needs three GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID` and
`VERCEL_PROJECT_ID`.

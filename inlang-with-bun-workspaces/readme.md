## Problem

Trying to get [Inlang](https://inlang.com) working with this bun workspace. Failing.

## Setup

```
bun i
```

Add this to `web/.env`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bmVhdC1sZWVjaC0yNy5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_q5yoeNpFjxL341R2Vu4WgH4ESPaecn4o6jfZF7t8YY

NEXT_PUBLIC_URL=http://localhost:3000
```

## Try add Inlang

```
npx @inlang/paraglide-next init
```

Example run:

```
npx @inlang/paraglide-next init
Using existing cloned repo

✔ Which languages do you want to support?
en, ru, ko, zh, de, es, fr
ℹ Creating a new inlang project in the current working directory.
✔ Successfully created a new inlang project.
ℹ Setting up Paraglide-Next for the App Router

✔ Which routing strategy do you want to use?
Path Prefix

 WARN  Skipping creating the middleware.ts file as it already exists. Please manually add the middleware exported from @/lib/i18n


 WARN  Failed to find the export default statement in next.config.js
You will have to add the paraglide plugin manually

Learn how to do that in the documentation:
https://inlang.com/m/osslbuzt/paraglide-next-i18n



✔ Do you want to update your <Link>s for localised routing? (recommended)
This will replace any imports from next/link and next/navigation with their localised counterparts
Yes

✔ Are you using Visual Studio Code?
Yes
✔ Added the inlang Visual Studio Code extension (Sherlock) to the workspace recommendations.

✔ Do you want to add the 🥷 Ninja Github Action for linting translations in CI?

https://inlang.com/m/3gk8n4n4/app-inlang-ninjaI18nAction
Yes
✔ Added the 🥷 Ninja Github Action for linting translations
✔ Successfully initialized Paraglide-JS in this NextJS Project.

Learn more about Paraglide and Paraglide-Next at:
https://inlang.com/m/osslbuzt/paraglide-next-i18n
```

## Run website

```
bun web
```

It will fail after you do everything from our attempts.

# Abhi Computer Center website
React + Vite, frontend-only. Enquiries go through a prefilled WhatsApp message; nothing is stored.
## Run locally
`npm install` then `npm run dev`. Build with `npm run build` (output: `dist`).
## GitHub + Vercel
1. Create an empty repo on github.com. 2. `git init && git add . && git commit -m "Initial" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`
3. In Vercel: Add New → Project → import the repo. Framework: Vite. Build command `npm run build`, output directory `dist`. Deploy.
## Notes
Hero visual is an illustration, not a photo of the institute. Add real photos and logo in `public/`. Course fees, duration and eligibility are intentionally not stated.

# TESTING.md

## 01. Dependency Updates

Checking for updates
- Global install: npm install -g npm-check-updates
  - ncu — list available updates
  - ncu -u — update package.json
  - npm install — apply updates
- Local install: npm install --save-dev npm-check-updates
  - Keeps the tool version pinned per‑repo

Applying updates
- Review: npx npm-check-updates
- Update: npx npm-check-updates -u
- Install: npm install
- Optional visibility:
  - npm list --depth=0
  - npm list -g --depth=0

Updating all dependencies is where npm-check-updates (ncu) is useful:
- npx ncu -u
This updates the version ranges in package.json but does not install them until you run:
- npm install

If your goal is:

- update a single dependency: npm install <pkg>@latest
- update devDependencies: npm install <pkg>@latest -D
- update all version ranges in package.json: npx ncu -u
- save exact versions: npm install <pkg> -E

## 02. Post‑Update Checks

Basic validation

- Run tests: npm test
- Confirm no regressions

Documentation

- Record version bumps if applicable
- Note any new minimum Node or tooling requirements

Commit baseline

- git add package.json package-lock.json
- git commit -m "chore: dependency updates"
- Optional tag: git tag -a deps-YYYYMMDD -m "Dependency baseline"

Optional validation script

```js
"scripts": {
  "validate": "eslint . --ext .js,.cjs,.mjs && prettier --check . && npm test"
}
```

Run: npm run validate

## 03. Cleanup

Useful when dependencies behave inconsistently or after major updates.

Full reinstall:

- rm -rf node_modules package-lock.json
- npm install

Remove unused packages:

- npm prune

Clear npm cache (optional):

- npm cache clean --force

## 04. Lint Checks

- ESLint: npx eslint . --ext .js,.cjs,.mjs
- Prettier: npx prettier --check .
- Peer dependency sanity check:
  - npm ls eslint prettier
    - For visibility, not validation.

## 05. Excludes

Child .gitignore rules from multiple React projects cascade and override parent rules.

**Solution**

Use `.git/info/exclude` to block nested `.gitignore` files from overriding config.
Instead of fighting scattered `.gitignore` files, we placed global rules in `.git/info/exclude`.
This file is local only and never committed, so while stable and effective, somewhat inflexible.
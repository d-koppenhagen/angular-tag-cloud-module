# How to develop

```bash
npm install
npm run build
npm test
```

or if you use yarn:

```bash
yarn
yarn run build
yarn test
```

# How to publish

All the .ts files are transpiled to ES5/commonjs for best consumability.
Bump the version in `package.json` and...

```bash
npm test
npm publish
```

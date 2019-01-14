# AngularTagCloudModule

## Development
For development on the AngularTagCloudModule run the following commands first:

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

The module itself is located in `./src/app/tag-cloud-module`.

Run the command `npm start` from this directory to see the result in the browser.

# How to publish on NPM

All the packaged files are transpiled to ES5/commonjs for best consumability.
1. Bump up the version in `package.json` and when changes are done
2. run `npm run packagr` via console
4. **cd** into the `dist`-directory (`cd dist`) and run `npm publish` publish the new version on NPM.

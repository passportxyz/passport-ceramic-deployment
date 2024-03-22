# Boilerplate Composite Runtime Compilation

You can use the boilerplate in this repository to help merge and deploy composites onto your node (or a remote cloud node), allowing you to use the resulting runtime definition in your application

1. Run `npm install` to install the packages

```bash
npm install
```

2. If you are deploying to a remote node, alter the /scripts/composites.mjs to replace "your-endpoint-here" with your production node, and "your-private-seed" with your corresponding admin seed (we will be running this locally, so be sure to delete after):

```JavaScript
const ceramic = new CeramicClient("your-endpoint-here");
const seed = "your-private-seed"

//Creating a new admin DID based on your private key
const key = fromString(seed, "base16");
const did = new DID({
  resolver: getResolver(),
  provider: new Ed25519Provider(key),
});

spinner.info("Authenticating ceramic admin");
await did.authenticate();
ceramic.did = did;
```

3. Run the deploy script and ensure you're using the correct version of node:

```bash
nvm use 20
npm run deploy
```

## Learn More

To learn more about Ceramic please visit the following links

- [Ceramic Documentation](https://developers.ceramic.network/) - Learn more about the Ceramic Ecosystem.
- [ComposeDB](https://developers.ceramic.network/docs/composedb/getting-started) - Details on how to use and develop with ComposeDB!


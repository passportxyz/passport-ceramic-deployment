# Boilerplate Composite Runtime Compilation

You can use the boilerplate in this repository to help merge and deploy composites onto your node (or a remote cloud node), allowing you to use the resulting runtime definition in your application

1. Run `npm install` to install the packages

```bash
npm install
```

2. If you are experimenting locally, create dummy credentials:

```bash
npm run generate
```

2a. If you are deploying to a remote node, alter the /scripts/composites.mjs or /scripts/compositesTwo.mjs files in the following way:

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

3. There are two different ways of deploying you can use:

```bash
npm run testOne
```

or

```bash
npm run testTwo
```

## Learn More

To learn more about Ceramic please visit the following links

- [Ceramic Documentation](https://developers.ceramic.network/) - Learn more about the Ceramic Ecosystem.
- [ComposeDB](https://developers.ceramic.network/docs/composedb/getting-started) - Details on how to use and develop with ComposeDB!


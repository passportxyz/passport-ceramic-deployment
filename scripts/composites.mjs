import { readFileSync } from "fs";
import { CeramicClient } from "@ceramicnetwork/http-client";
import {
  createComposite,
  readEncodedComposite,
  writeEncodedComposite,
  writeEncodedCompositeRuntime,
} from "@composedb/devtools-node";
import { Composite } from "@composedb/devtools";
import { DID } from "dids";
import ora from "ora";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays/from-string";

const ceramic = new CeramicClient("<your endpoint>");
const spinner = ora();
/**
 * @param {Ora} spinner - to provide progress status.
 * @return {Promise<void>} - return void when composite finishes deploying.
 */
const authenticate = async () => {
  const seed = "<your seed>";
  const key = fromString(seed, "base16");
  const did = new DID({
    resolver: getResolver(),
    provider: new Ed25519Provider(key),
  });
  await did.authenticate();
  ceramic.did = did;
};

await authenticate();

spinner.info("creating composite");

const attestationComposite = await createComposite(
  ceramic,
  "./composites/00-attestation.graphql"
);

const composite = Composite.from([attestationComposite]);

await writeEncodedComposite(composite, "./definition.json");
spinner.info("creating composite for runtime usage");
await writeEncodedCompositeRuntime(
  ceramic,
  "./definition.json",
  "./definition.js"
);
spinner.info("deploying composite");
const deployComposite = await readEncodedComposite(
  ceramic,
  "./definition.json"
);

await deployComposite.startIndexingOn(ceramic);
spinner.succeed("composite deployed & ready for use");

/**
 * Authenticating DID for publishing composite
 * @return {Promise<void>} - return void when DID is authenticated.
 */

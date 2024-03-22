import { CeramicClient } from "@ceramicnetwork/http-client";
import {
  readEncodedComposite,
} from "@composedb/devtools-node";
import { DID } from "dids";
import ora from "ora";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays/from-string";

const ceramic = new CeramicClient("http://localhost:7007");
const spinner = ora();
/**
 * @param {Ora} spinner - to provide progress status.
 * @return {Promise<void>} - return void when composite finishes deploying.
 */
const authenticate = async () => {
  const seed = "1876e5e8034a6925d37dc294e73d62b15964f8e55ec4f2839dda4e928edc5cb9";
  const key = fromString(seed, "base16");
  const did = new DID({
    resolver: getResolver(),
    provider: new Ed25519Provider(key),
  });
  await did.authenticate();
  ceramic.did = did;
};

await authenticate();

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

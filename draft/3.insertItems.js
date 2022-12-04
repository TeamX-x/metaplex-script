const dotenv = require("dotenv");
dotenv.config();
const {
  Keypair,
  Connection,
  clusterApiUrl,
  PublicKey,
} = require("@solana/web3.js");
const {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toBigNumber,
  toMetaplexFileFromBrowser,
  toMetaplexFile,
} = require("@metaplex-foundation/js");
const {nftStorage} = require("@metaplex-foundation/js-plugin-nft-storage");
const BN = require("bn.js");
const metadata0 = require("../assets/0.json");

const keyPair = require("/Users/thangtran/.config/solana/id.json");
const seed = Uint8Array.from(keyPair);
const wallet = Keypair.fromSecretKey(seed);
const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());
console.log(metadata0);
metaplex.use(nftStorage());

const main = async () => {
  const candyMachineAddress = new PublicKey(
    new BN(process.env.CANDY_MACHINE, 16)
  );

  console.log(candyMachineAddress);

  // // Uploading some JSON metadata contains assets already uploaded.
  const {uri} = await metaplex.nfts().uploadMetadata(metadata0);
  // const uri =
  //   "https://nftstorage.link/ipfs/bafkreidorinrvnb47pustyeslpjz36kcxjwvfhlejunm4yp4bkp35e2uxy";
  console.log(uri); //https://nftstorage.link/ipfs/bafkreidorinrvnb47pustyeslpjz36kcxjwvfhlejunm4yp4bkp35e2uxy
  const candyMachine = await metaplex.candyMachines().findByAddress({
    address: candyMachineAddress,
  });
  console.log(candyMachine);

  // Insert
  await metaplex.candyMachines().insertItems({
    candyMachine,
    items: [
      {name: "App X", uri: uri},
      {name: "App Y", uri: uri},
      {name: "App Z", uri: uri},
      {name: "App XA", uri: uri},
      {name: "App YB", uri: uri},
    ],
  });

  const refreshCandyMachine = await metaplex
    .candyMachines()
    .refresh(candyMachine);
  console.log(refreshCandyMachine);
};

main();

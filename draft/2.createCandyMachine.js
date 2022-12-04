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
  sol,
} = require("@metaplex-foundation/js");
const BN = require("bn.js");

const keyPair = require("/Users/thangtran/.config/solana/id.json");
const seed = Uint8Array.from(keyPair);
const wallet = Keypair.fromSecretKey(seed);
const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());

const main = async () => {
  const collectionNFTAddress = new PublicKey(
    new BN(process.env.COLLECTION_NFT, 16)
  );

  // Create the Candy Machine.
  const {candyMachine} = await metaplex.candyMachines().create({
    // withoutCandyGuard: true,
    itemsAvailable: toBigNumber(5),
    sellerFeeBasisPoints: 333, // 3.33%
    collection: {
      address: collectionNFTAddress,
      updateAuthority: wallet,
    },
    maxEditionSupply: null,
    // guards: {
    //   botTax: {lamports: sol(0.01), lastInstruction: false},
    //   // All other guards are disabled...
    // },
  });

  console.log(candyMachine);
  console.log(
    "Save candy machine data account address: ",
    candyMachine.address
  );
};

main();

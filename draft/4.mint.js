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
} = require("@metaplex-foundation/js");
const BN = require("bn.js");

const keyPair = require("/Users/thangtran/.config/solana/id.json");
const seed = Uint8Array.from(keyPair);
const wallet = Keypair.fromSecretKey(seed);
const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());

console.log(wallet.publicKey.toBase58());

const main = async () => {
  const candyMachineAddress = new PublicKey(
    new BN(process.env.CANDY_MACHINE, 16)
  );

  const candyMachine = await metaplex.candyMachines().findByAddress({
    address: candyMachineAddress,
  });
  console.log(candyMachine);

  // Mint
  // const {nft} = await metaplex.candyMachines().mint({
  //   candyMachine: candyMachine,
  //   collectionUpdateAuthority: wallet.publicKey,
  //   // owner: wallet.publicKey,
  // });

  // console.log(nft);

  const refreshCandyMachine = await metaplex
    .candyMachines()
    .refresh(candyMachine);

  console.log(refreshCandyMachine);
};

main();

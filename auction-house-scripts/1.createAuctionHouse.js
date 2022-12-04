const {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} = require("@metaplex-foundation/js");
const {Keypair, Connection, clusterApiUrl} = require("@solana/web3.js");

const keyPair = require("/Users/thangtran/.config/solana/id.json");
const seed = Uint8Array.from(keyPair);
const wallet = Keypair.fromSecretKey(seed);
const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());
console.log(wallet);

const main = async () => {
  const {auctionHouse} = await metaplex
    .auctionHouse()
    .create({sellerFeeBasisPoints: 200});

  console.log(auctionHouse);

  // Airdrop to Auction House Fee to pay transaction fee
  let txhash = await connection.requestAirdrop(
    auctionHouse.feeAccountAddress,
    1e9
  );
  console.log(`airdrop txhash: ${txhash}`);
};

main();

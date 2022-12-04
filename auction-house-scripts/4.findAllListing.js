const dotenv = require("dotenv");
dotenv.config();

const {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} = require("@metaplex-foundation/js");
const {
  Keypair,
  Connection,
  clusterApiUrl,
  PublicKey,
} = require("@solana/web3.js");
const BN = require("bn.js");

const keyPair = require("/Users/thangtran/.config/solana/id.json");
const seed = Uint8Array.from(keyPair);
const wallet = Keypair.fromSecretKey(seed);
const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());
console.log(wallet.publicKey);

const main = async () => {
  const auctionHouseAddress = new PublicKey(
    new BN(process.env.AUCTION_HOUSE, 16)
  );

  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({address: auctionHouseAddress});

  const allListing = await metaplex
    .auctionHouse()
    .findListings({auctionHouse: auctionHouse});

  console.log(allListing);
};

main();

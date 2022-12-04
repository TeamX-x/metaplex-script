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

const main = async (buyerWallet, receiptStringAddress) => {
  const receiptAddress = new PublicKey(new BN(receiptStringAddress, 16));
  const auctionHouseAddress = new PublicKey(
    new BN(process.env.AUCTION_HOUSE, 16)
  );

  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({address: auctionHouseAddress});

  console.log(auctionHouse);

  const listing = await metaplex.auctionHouse().findListingByReceipt({
    receiptAddress: receiptAddress,
    auctionHouse,
  });

  console.log(listing.price);
  const {purchase} = await metaplex.auctionHouse().buy({
    auctionHouse,
    authority: buyerWallet,
    listing,
  });

  console.log("Purchase: ", purchase);
};

// const receiptAddress = main();

const buyerkeyPair = require("/Users/thangtran/.config/solana/devnet-hashlips.json");
const buyerSeed = Uint8Array.from(buyerkeyPair);
const buyerWallet = Keypair.fromSecretKey(buyerSeed);

main(
  buyerWallet,
  "db60043b64ca2be978230abe9eed6996a229f0ea0be6b208f96f00d94ab754ef"
);

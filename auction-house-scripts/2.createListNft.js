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

const main = async (sellerWallet, nftStringAddress, price) => {
  const nftAddress = new PublicKey(new BN(nftStringAddress, 16));
  console.log("NFT address: ", nftAddress.toBase58());

  const auctionHouseAddress = new PublicKey(
    new BN(process.env.AUCTION_HOUSE, 16)
  );

  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({address: auctionHouseAddress});

  console.log("auctionHouse: ", auctionHouse);

  const {listing} = await metaplex.auctionHouse().list({
    auctionHouse,
    seller: sellerWallet,
    mintAccount: nftAddress,
    price: price,
  });

  console.log("listing: ", listing);
};

// Create seller wallet
const sellerKeyPair = require("/Users/thangtran/.config/solana/id.json");
const sellerSeed = Uint8Array.from(sellerKeyPair);
const sellerWallet = Keypair.fromSecretKey(sellerSeed);

const nftAddress =
  "4a8a1513f0cdb07ad5db146d9ce7eac3ddd098204b5ebdba74edbf602df8e683";

const price = 1000000000;

main(sellerWallet, nftAddress, price);

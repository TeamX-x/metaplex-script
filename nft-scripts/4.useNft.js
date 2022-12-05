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

const keyPair = require("/Users/thangtran/.config/solana/devnet-hashlips.json"); // This is the key of the edition nft owner
const seed = Uint8Array.from(keyPair);
const wallet = Keypair.fromSecretKey(seed);
const mintAddress = new PublicKey(
  new BN("f2f0900f7bec97e6233bc9b78c7195efcba89a9d864efe4e7658e81f0d9ae24", 16)
);

const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());

console.log(wallet.publicKey.toBase58());

const useEdition = async (mintAddress) => {
  const nft = await metaplex.nfts().findByMint({mintAddress});
  const updatedNft = await metaplex.nfts().refresh(nft);
  console.log("NFT: ", updatedNft);
};

useEdition(mintAddress, wallet);

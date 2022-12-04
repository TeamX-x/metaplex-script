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

const mintEdition = async (masterMintAddress, userAddress) => {
  const nft = await metaplex.nfts().findByMint({masterMintAddress});
  console.log("Master NFT: ", nft);
  const {nft: printedNft} = await metaplex.nfts().printNewEdition({
    originalMint: nft.address,
    newOwner: userAddress,
    isCollection: true,
  });

  console.log("Edition nft: ", printedNft);
};

const mintAddress = new PublicKey(
  new BN("4a8a1513f0cdb07ad5db146d9ce7eac3ddd098204b5ebdba74edbf602df8e683", 16)
);

const newOwner = new PublicKey("8AGZrh65YiifkN5KEL19CJXbrXTZ3mb3dZFTwoHBuTSD");

mintEdition(mintAddress, newOwner);

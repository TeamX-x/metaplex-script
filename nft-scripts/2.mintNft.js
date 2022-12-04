const dotenv = require("dotenv");
dotenv.config();

const {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} = require("@metaplex-foundation/js");
const {
  Connection,
  clusterApiUrl,
  Keypair,
  PublicKey,
} = require("@solana/web3.js");
const keyPair = require("/Users/thangtran/.config/solana/id.json");
const BN = require("bn.js");

const connection = new Connection(clusterApiUrl("devnet"));

const seed = Uint8Array.from(keyPair);
const wallet = Keypair.fromSecretKey(seed);
console.log(wallet.publicKey);
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());

const mintNft = async (to, uri, name, symbol) => {
  const collectionNFTAddress = new PublicKey(
    new BN(process.env.COLLECTION_NFT, 16)
  );

  console.log("collectionNFTAddress: ", collectionNFTAddress);
  const {nft} = await metaplex.nfts().create({
    uri: uri,
    name: name,
    sellerFeeBasisPoints: 500, // Represents 5.00%.
    maxSupply: null,
    symbol: symbol,
    collection: collectionNFTAddress,
    collectionAuthority: wallet,
    tokenOwner: to,
    uses: {
      useMethod: 2,
      remaining: 1,
      total: 1,
    },
    mintAuthority: wallet,
  });

  console.log(nft);
};

// const to = new PublicKey("8AGZrh65YiifkN5KEL19CJXbrXTZ3mb3dZFTwoHBuTSD");
const uri = "https://arweave.net/123";
const to = wallet.publicKey;
mintNft(to, uri, "My NFT", "Dapp1");

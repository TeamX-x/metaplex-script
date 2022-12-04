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

const createNftCollection = async () => {
  // Create the Collection NFT.
  const {nft: collectionNft} = await metaplex.nfts().create({
    name: "Dhub Collection NFT",
    uri: "https://dhub.store/path/to/some/json/metadata.json",
    sellerFeeBasisPoints: 0,
    isCollection: true,
    updateAuthority: wallet,
  });

  console.log("collectionNft: ", collectionNft);
  console.log("Save address to env: ", collectionNft.address);
};

createNftCollection();

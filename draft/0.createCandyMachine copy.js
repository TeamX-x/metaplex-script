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
  toDateTime,
} = require("@metaplex-foundation/js");
const BN = require("bn.js");

const keyPair = require("/Users/thangtran/.config/solana/id.json");
const {Wallet} = require("ethers");
const seed = Uint8Array.from(keyPair);
const wallet = Keypair.fromSecretKey(seed);
const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());

// console.log(keyPair);
// console.log(wallet);
// const myCustomAuthority = Keypair.generate();
// console.log(myCustomAuthority);

const main = async () => {
  // console.log(process.env.COLLECTION_NFT);
  // // Create the Collection NFT.
  // const {nft: collectionNft} = await metaplex.nfts().create({
  //   name: "My Collection NFT",
  //   uri: "https://example.com/path/to/some/json/metadata.json",
  //   sellerFeeBasisPoints: 0,
  //   isCollection: true,
  //   updateAuthority: wallet,
  // });

  // console.log("keypairIdentity: ", metaplex.identity);

  // console.log("Collection NFT object: ", collectionNft);
  // console.log("Collection NFT address: ", collectionNft.address);

  // const nft = await metaplex.nfts().findByMint({ mintAddress });
  // const collectionNFTAddress = new PublicKey(
  //   new BN(process.env.COLLECTION_NFT, 16)
  // );

  // // Setting up candy machine
  // // https://metaplex-foundation.github.io/js/types/js.CandyMachine.html
  // const candyMachineSettings = {
  //   authority: wallet,
  //   sellerFeeBasisPoints: 200,
  //   symbol: "DHUB",
  //   maxEditionSupply: toBigNumber(0),
  //   isMutable: true,
  //   creators: [{address: wallet.publicKey, share: 100}],
  //   collection: {
  //     address: collectionNFTAddress,
  //     // address: process.env.COLLECTION_NFT,
  //     updateAuthority: wallet.publicKey, // Account that can update the collection nft
  //   },
  //   itemsAvailable: toBigNumber(500), // maximum amount of NFTs that will be minted from the Candy Machine.
  //   itemSettings: {
  //     type: "configLines",
  //     prefixName: "DHUB APP #$ID+1$",
  //     nameLength: 0,
  //     prefixUri: "https://arweave.net/",
  //     uriLength: 43,
  //     isSequential: false,
  //   },
  //   // guards: {
  //   //   botTax: {lamports: sol(0.01), lastInstruction: false},
  //   //   // solPayment: {amount: sol(1.5), destination: treasury},
  //   //   startDate: {date: toDateTime("2022-10-17T16:00:00Z")},
  //   //   // All other guards are disabled...
  //   // },
  // };

  //  // Create a candy machine with a Collection NFT
  //  const {candyMachine} = await metaplex
  //  .candyMachines()
  //  .create(candyMachineSettings);

  // // Create the Collection NFT.
  // const {nft: collectionNft} = await metaplex.nfts().create({
  //   name: "My Collection NFT",
  //   uri: "https://example.com/path/to/some/json/metadata.json",
  //   sellerFeeBasisPoints: 0,
  //   isCollection: true,
  // });

  // console.log(collectionNft);

  const collectionNFTAddress = new PublicKey(
    new BN(process.env.COLLECTION_NFT, 16)
  );

  // Create the Candy Machine.
  const {candyMachine} = await metaplex.candyMachines().create({
    withoutCandyGuard: true,
    itemsAvailable: toBigNumber(5),
    sellerFeeBasisPoints: 333, // 3.33%
    collection: {
      address: collectionNFTAddress,
      updateAuthority: wallet,
    },
  });

  console.log(candyMachine);
  console.log("Save candy machine data account address: ", candyMachine.address)
};

main();

// //   Fetch the existed candy machine
// const candyMachine = await metaplex
//   .candyMachines()
//   .findByAddress({address: new PublicKey("Gjwc...thJS")});

// // Update authority
// await metaplex.candyMachines().update({
//   candyMachine,
//   authority: currentAuthority,
//   newAuthority: newAuthority.address,
// });

// // Update mint authority
// await metaplex.candyMachines().update({
//   candyMachine,
//   authority: currentAuthority,
//   newMintAuthority: newMintAuthority, // Notice this must be a Signer.
// });

// // Update shared NFT data (setting up in candy machine), however if a NFT is minted then data cannot be updated.
// await metaplex.candyMachines().update({
//   candyMachine,
//   symbol: "NEW",
//   sellerFeeBasisPoints: 100,
//   creators: [{address: newCreator, share: 100}],
// });

// // Update collection NFT
// await metaplex.candyMachines().update({
//   candyMachine,
//   collection: {
//     address: newCollection.address,
//     updateAuthority: newCollectionAuthority,
//   },
// });

// // Update item setting
// await metaplex.candyMachines().update({
//   candyMachine,
//   itemSettings: {
//     type: "configLines",
//     prefixName: "My New NFT #$ID+1$",
//     nameLength: 0,
//     prefixUri: "https://arweave.net/",
//     uriLength: 43,
//     isSequential: true,
//   },
// });

// // Update guards
// await metaplex.candyMachines().update({
//   candyMachine,
//   guards: {
//     botTax: { lamports: sol(0.01), lastInstruction: false },
//     solPayment: { amount: sol(3), destination: treasury },
//     startDate: { date: toDateTime("2022-10-18T16:00:00Z") },
//   },
// });

// console.log(candyMachine.candyGuard.guards);

// const updatedCandyMachine = await metaplex
//   .candyMachines()
//   .refresh(candyMachine);

// // Delete candy machine update minting
// await metaplex.candyMachines().delete({
//   candyMachine: candyMachine.address,
//   candyGuard: candyMachine.candyGuard.address,
// });

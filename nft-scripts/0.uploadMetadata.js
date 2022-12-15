const {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} = require("@metaplex-foundation/js");
const {Keypair, Connection, clusterApiUrl} = require("@solana/web3.js");
const {nftStorage} = require("@metaplex-foundation/js-plugin-nft-storage");
const keyPair = require("/Users/thangtran/.config/solana/id.json");
const seed = Uint8Array.from(keyPair);
const wallet = Keypair.fromSecretKey(seed);
const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());
// console.log(wallet);
metaplex.use(nftStorage());

const uploadMetadata = async (metadata) => {
  const {uri} = await metaplex.nfts().uploadMetadata(metadata);
  console.log("URI is: ", uri);
};

const metadata = {
  title: "ArthSwap",
  description:
    "'What is ArthSwap? ArthSwap is the No.1 decentralized exchange platform with the largest community on Astar Network. With simple UI and design for High APY, it enables High-Frequency Trade on Astar Network. ArthSwap history ArthSwap was launched on January 22, 2022 as a first Dapps on Astar Network. In a short span of one month, ArthSwap has exceeded 90 million in its TVL and the number of its community users has expanded to more than 200K, users on Twitter, Discord and Telegram included. ArthSwap has received support from various backers. These include Next Web Capital, led by Astar Founder Sota, and OKX Blockdream Ventures. Key Features ArthSwap is a one-stop defi solution on Astar Network and will offer everything you want in defi. This includes Swap, Pool, Farming, Staking and IDO Launchpad.",
  image:
    "https://nftstorage.link/ipfs/bafybeid5ftqbr2c3nnvwmgnt4gjnzrbetrnqsgn6tv24nojgscdplg5hzq/Screen%20Shot%202022-06-14%20at%2007.14.04.png",
  external_url: "https://solana.com/",
  attributes: [
    {
      trait_type: "extra",
      value: "IDO, launchpad",
    },
    {
      trait_type: "trait2",
      value: "value2",
    },
  ],
  properties: {
    category: "application",
  },
};

// const metadata = {
//   owner_id: "ckdVPfUz1GfWQac1mgnusmLUUFTxzpYc7CUN95QFcndl",
//   is_selling: true,
//   app_id: "app_id_02",
//   selling_price: 34.3,
//   using_price: 15.1,
//   users: ["user1, user2"],
//   verified: true,
//   metadata: {
//     title: "OnFinality",
//     description: `Project Overview OnFinality, a leading blockchain IaaS (infrastructure as a service) platform, is providing a reliable and scalable infrastructure to Astar and Shiden. The Astar community can now build applications on high-performance RPC archive nodes in the Shiden Network (and future Astar Network) for free. OnFinality's API Service is free for the Astar and Shiden community (within fair usage limits) and is built with scalability in mind. You can access reliable enterprise level API endpoints for Astar and Shiden in only minutes. OnFinality also provides a one-click-deploy node service that allows customers to deploy their own Astar and Shiden collator nodes in our platform. OnFinality is a SaaS platform that provides infrastructure and developer tools that saves developers hours and allows teams to grow with confidence. Our mission is to help blockchain and dApp developers build the decentralised future faster. Service This service is currently online and can be connected to via these endpoints`,
//     reference: "https://solana.com/",
//     extra: "Defi, CEX",
//     media:
//       "https://bafybeihzfflyc6tfleumoraezxbkstxq5stgojfh2ipd4kh2easrjza5fu.ipfs.nftstorage.link/Screen%20Shot%202022-06-14%20at%2016.30.22.png",
//   },
// };

uploadMetadata(metadata);

// https://bafkreielcsj7qpbru2n6gtemrlcx34ppyxhspynvkrekwnglvwc6iezmku.ipfs.nftstorage.link/

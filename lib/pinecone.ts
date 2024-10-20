// import { PineconeClient  } from '@pinecone-database/pinecone'

// export const getPPineconeneconeClient = async () => {
//   const client = new PineconeClient()

//   await client.init({
//     apiKey: process.env.PINECONE_API_KEY!,
//     environment: 'us-east-1',
//   })

//   return client
// }


import { Pinecone } from '@pinecone-database/pinecone';

export const getPineconeClient = async () => {
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  return client;
}
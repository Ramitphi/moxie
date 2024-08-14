import { gql, GraphQLClient } from "graphql-request";
import { ethers } from "ethers";

type Moxie = {
  address: string;
  balance: string;
};

const fetchBalance = async (userAddresses: string[]) => {
  const graphQLClient = new GraphQLClient(
    "https://api.studio.thegraph.com/query/23537/moxie_vesting_mainnet/version/latest"
  );
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const query = gql`
    query MyQuery {
      tokenLockWallets(where: { beneficiary_in: ${JSON.stringify(
        userAddresses
      )} }) {
        address: id
        balance
      }
    }
  `;

  try {
    const data: {
      tokenLockWallets: Moxie[];
    } = await graphQLClient.request(query);

    if (!data.tokenLockWallets[0]?.balance)
      throw Error("invalid from airstack");

    const balance = data.tokenLockWallets[0]?.balance;

    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/token_price/base?contract_addresses=0x8C9037D1Ef5c6D1f6816278C7AAF5491d24CD527&vs_currencies=usd",
      options
    );
    const data1 = await response.json();
    const price = data1["0x8c9037d1ef5c6d1f6816278c7aaf5491d24cd527"].usd;

    const ggs = ethers.formatUnits(balance, 18);

    const value = parseInt(ggs) * price;
    console.log(Math.trunc(value));

    return Math.trunc(value);
  } catch (e) {
    console.error(e);
  }
};

export default fetchBalance;

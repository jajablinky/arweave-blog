import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

const FetchTransactionId = ({ cursor }) => {
  const endpoint = "https://arweave.dev/graphql";
  const query = `
    query ContributorQuery(
      $first: Int!
      $contributor: String!
      $cursor: String
    ) {
      transactions(
        first: $first,
        after: $cursor
        tags: [
          { name: "App-Name", values: ["MirrorXYZ"] }
          { name: "Contributor", values: [$contributor] }
        ]
      ) {
        edges {
          cursor
          node {
            id
          }
        }
        pageInfo
        {
          hasNextPage
        }
      }
    }
  `;
  const variables = {
    contributor: "0xeD98464BDA3cE53a95B50f897556bEDE4316361c",
    first: 3,
    cursor: cursor,
  };
  const fetchData = async () => {
    const res = await axios({
      url: endpoint,
      method: "post",
      data: { query: query, variables: variables },
    });
    return res.data;
  };

  const { data, isLoading, error, refetch } = useQuery(
    "transactions",
    fetchData
  );
  return {
    data,
    isLoading,
    error,
    cursor,
    refetch,
  };
};

export default FetchTransactionId;

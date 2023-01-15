import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

const FetchTransactionId = () => {
  const endpoint = "https://arweave.dev/graphql";
  const query = `
    query ContributorQuery(
      $first: Int! = 3,
      $contributor: String!
    ) {
      transactions(
        first: $first,
        tags: [
          { name: "App-Name", values: ["MirrorXYZ"] }
          { name: "Contributor", values: [$contributor] }
        ]
      ) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;
  const variables = {
    contributor: "0xB618aaCb9DcDc21Ca69D310A6fC04674D293A193",
    first: 3,
  };
  const { data, isLoading, error } = useQuery("launches", async () => {
    const res = await axios({
      url: endpoint,
      method: "post",
      data: { query: query, variables: variables },
    });
    return res.data;
  });

  return { data, isLoading, error };
};

export default FetchTransactionId;

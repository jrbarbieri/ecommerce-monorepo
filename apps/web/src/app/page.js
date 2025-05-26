import HomeScreen from "../screens/HomeScreen";
import apolloClient from "@/lib/apollo-client";
import { gql } from "@apollo/client";

export default async function Page() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        products {
          id
          name
          price
        }
      }
    `,
  });

  return <HomeScreen products={data.products} />;
}

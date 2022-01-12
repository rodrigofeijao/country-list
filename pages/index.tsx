
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import CountryList, { ALL_COUNTRIES_QUERY } from "../components/CountryList";
import PageContainer from "../components/PageContainer";

function Homepage() {
  return (
    <PageContainer>
      <CountryList />
    </PageContainer>
  );
}

/**
 * Allow pre render to pre load countries
 */
export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_COUNTRIES_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default Homepage;

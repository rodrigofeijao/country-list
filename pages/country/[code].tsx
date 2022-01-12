import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import { get } from "lodash";

import CountryDetails from "../../components/CountryDetails";
import PageContainer from "../../components/PageContainer";

function CountryPage() {
  const router = useRouter();
  const countryCode = get(router, "query.code", null);

  if (!countryCode)
    return (
      <PageContainer>
        <Alert severity="error">The country code is missing</Alert>
      </PageContainer>
    );

  return (
    <PageContainer>
      <CountryDetails countryCode={countryCode} />
    </PageContainer>
  );
}

export default CountryPage;

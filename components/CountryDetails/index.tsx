import { gql, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { Country } from "../../types/country";
import { PAPER, MAIN_BOX, FULL } from "./styles";

export const COUNTRY_QUERY = gql`
  query getCountry($code: ID!) {
    country(code: $code) {
      name
      code
      emoji
      capital
    }
  }
`;

interface CountryDetailsProps {
  countryCode: string;
}

export default function CountryDetails({ countryCode }: CountryDetailsProps) {
  const { loading, error, data } = useQuery<{
    country: Country;
  }>(COUNTRY_QUERY, {
    variables: {
      code: countryCode,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading)
    return (
      <Box sx={FULL}>
        <LinearProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={FULL}>
        <Alert severity="error">
          There was an error while loading the content of this page
        </Alert>
      </Box>
    );

  const { emoji, name, capital } = data!.country;

  // TODO: Replace with dynamic image from Unsplash
  const imageUrl =
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80";

  return (
    <Box sx={FULL}>
      <Paper sx={{ ...PAPER, backgroundImage: `url(${imageUrl})` }}>
        <Grid container>
          <Grid item md={6}>
            <Box sx={MAIN_BOX}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {emoji}
                {` `}
                {name}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {capital}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

import { gql, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Link from "next/link";

import { Country } from "../../types/country";
import { FULL } from "./styles";

export const ALL_COUNTRIES_QUERY = gql`
  {
    countries {
      name
      code
      emoji
      emojiU
    }
  }
`;

export default function CountryList() {
  const { loading, error, data } = useQuery<{
    countries: Country[];
  }>(ALL_COUNTRIES_QUERY, {
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

  const onClick = () => {};

  return (
    <Box sx={FULL}>
      <List>
        {data!.countries.map((country) => (
          <div key={country.code}>
            <ListItem disablePadding>
              <Link href={`/country/${country.code}`} passHref>
                <ListItemButton component="a" onClick={onClick}>
                  <ListItemAvatar>{country.emoji}</ListItemAvatar>
                  <ListItemText primary={country.name} />
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
}

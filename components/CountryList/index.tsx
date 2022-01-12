import { useEffect, useState } from "react";
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
import { chunk } from "lodash";
import { Pagination } from "@mui/material";

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

  const [page, setPage] = useState(1);
  const [groupedCountries, setGroupedCountries] = useState<Country[][]>([[]]);

  useEffect(() => {
    setGroupedCountries(chunk(data!.countries, 10));
  }, [data]);

  const handlePaginationChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

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

  const getNumberOfPages = (countries: Country[][]): number => {
    return countries.length;
  };

  return (
    <Box sx={FULL}>
      <List>
        {groupedCountries[page - 1].map((country) => (
          <div key={country.code}>
            <ListItem disablePadding>
              <Link href={`/country/${country.code}`} passHref>
                <ListItemButton component="a" onClick={() => null}>
                  <ListItemAvatar>{country.emoji}</ListItemAvatar>
                  <ListItemText primary={country.name} />
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Box display="flex" justifyContent="center">
        <Pagination
          count={getNumberOfPages(groupedCountries)}
          page={page}
          onChange={handlePaginationChange}
        />
      </Box>
    </Box>
  );
}

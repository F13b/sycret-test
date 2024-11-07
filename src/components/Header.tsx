import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ py: "1rem", mb: "3rem" }}>
      <Typography component={"h1"} variant="h4">
        Some company
      </Typography>
    </Box>
  );
};

export default Header;

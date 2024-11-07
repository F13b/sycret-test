import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ICertificate, ICertificateData } from "../types";
import $api from "../axios";
import { useState } from "react";
import certificateStore from "../store/certificate-store";
import Header from "../components/Header";

export async function loader() {
  const { data } = await $api.get("", {
    params: {
      ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
      MethodName: "OSGetGoodList",
    },
  });

  const response: ICertificateData = data.data;

  return { response };
}

const Root = () => {
  const { certificate, setCertificate } = certificateStore;
  const { response } = useLoaderData() as ICertificateData;
  const [certificateID, setCertificateID] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    const cert = response.find(
      ({ ID }) => ID === (event.target.value as string)
    ) as ICertificate;
    setCertificateID(event.target.value as string);
    console.log(cert);
    setCertificate(cert);
  };

  return (
    <>
      <Header />
      <Box component={"main"}>
        <Container>
          <Card>
            <CardHeader title="Выберите подарочный сертификат" />
            <CardContent>
              <FormControl fullWidth>
                <InputLabel id="select-label">Выберите сертификат</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  label="Выберите сертификат"
                  value={certificateID}
                  onChange={handleChange}
                >
                  {response.map((item) => (
                    <MenuItem key={item.ID} value={item.ID}>
                      {item.NAME}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
            {Object.keys(certificate).length !== 0 ? (
              <CardActions>
                <Box>
                  <Typography sx={{ mb: ".5rem" }}>
                    Цена: {certificate.SUMMA}&#8381;
                  </Typography>
                  <Button onClick={() => navigate("/contacts")}>Купить</Button>
                </Box>
              </CardActions>
            ) : null}
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Root;

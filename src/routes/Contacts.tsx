import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import InputMask from "react-input-mask";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import certificateStore from "../store/certificate-store";
import $api from "../axios";
import Header from "../components/Header";

interface IFormInput {
  username: string;
  message?: string;
  phone: string;
  email: string;
}

const schema = yup
  .object({
    username: yup.string().required('Поле "ФИО" обязательное'),
    message: yup.string(),
    phone: yup.string().required('Поле "Телефон" обязательное'),
    email: yup
      .string()
      .email("Некорректный Email")
      .required('Поле "Email" обязательное'),
  })
  .required();

const Contacts = () => {
  const navigate = useNavigate();
  const { certificate, removeCertificate } = certificateStore;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      message: "",
      phone: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInput) => {
    console.log(data);

    const response = await $api.post("", {
      params: {
        ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
        MethodName: "OSSale",
        Id: certificate.ID,
        TableName: certificate.TABLENAME,
        PrimaryKey: certificate.PRIMARYKEY,
        Price: certificate.PRICE,
        Summa: certificate.SUMMA,
        ClientName: data.username,
        Phone: data.phone,
        Email: data.email,
        PaymentTypeId: 2,
        UseDelivery: 0,
        MsgText: data.message,
      },
    });

    if (response !== null) {
      removeCertificate();
      navigate("/payment");
    }
  };

  return (
    <>
      <Header />
      <Box>
        <Container>
          <Card>
            <CardHeader title="Для покупки сертификата, заполните форму ниже" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <FormControl
                  fullWidth
                  sx={{ mb: "1rem" }}
                  error={errors.username ? true : false}
                >
                  <InputLabel id="username-label">ФИО</InputLabel>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <OutlinedInput
                        {...field}
                        label="ФИО"
                        startAdornment={
                          <InputAdornment position="start">
                            <PersonRoundedIcon />
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  <FormHelperText>{errors.username?.message}</FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  sx={{ mb: "1rem" }}
                  error={errors.username ? true : false}
                >
                  <InputLabel id="phone-label">Телефон</InputLabel>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <InputMask mask="+7 (999) 999-99-99" {...field}>
                        {(inputProps) => (
                          <OutlinedInput
                            {...inputProps}
                            label="Телефон"
                            startAdornment={
                              <InputAdornment position="start">
                                <PhoneRoundedIcon />
                              </InputAdornment>
                            }
                          />
                        )}
                      </InputMask>
                    )}
                  />
                  <FormHelperText>{errors.phone?.message}</FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  sx={{ mb: "1rem" }}
                  error={errors.username ? true : false}
                >
                  <InputLabel id="email-label">Email</InputLabel>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <OutlinedInput
                        {...field}
                        label="Email"
                        startAdornment={
                          <InputAdornment position="start">
                            <EmailRoundedIcon />
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  <FormHelperText>{errors.email?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth sx={{ mb: "1rem" }}>
                  <InputLabel id="message-label">Сообщение</InputLabel>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <OutlinedInput
                        {...field}
                        label="Сообщение"
                        rows={"4"}
                        multiline
                        placeholder="Ваше сообщение..."
                      />
                    )}
                  />
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  sx={{ mr: "1rem" }}
                  onClick={() => navigate("/certificates")}
                >
                  Назад
                </Button>
                <Button type="submit">Перейти к оплате</Button>
              </CardActions>
            </form>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Contacts;

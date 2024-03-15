import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";

interface Props {
  handleChangeInput: (e: { target: { name: string; value: string } }) => void;
  handleSubmit: (e: { preventDefault: () => void }) => void;
  handleFileInput: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tempFormData: any;
  isUpdate: boolean;
}

const Form: React.FC<Props> = ({
  handleChangeInput,
  handleSubmit,
  tempFormData,
  isUpdate,
  handleFileInput,
}) => {
  return (
    <>
      <Container component="main" maxWidth="sm">
        <Paper
          variant="elevation"
          elevation={10}
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Product detail
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      name="productName"
                      fullWidth
                      id="name"
                      label="Name*"
                      placeholder="name"
                      onChange={handleChangeInput}
                      value={
                        !tempFormData.productName.error
                          ? tempFormData.productName
                          : ""
                      }
                      error={tempFormData.productName.error}
                      helperText={
                        tempFormData.productName.error
                          ? "Enter productName!"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-multiline-static"
                      name="description"
                      label="Description*"
                      multiline
                      rows={3}
                      fullWidth
                      placeholder="description"
                      onChange={handleChangeInput}
                      value={
                        !tempFormData.description.error
                          ? tempFormData.description
                          : ""
                      }
                      error={tempFormData.description.error}
                      helperText={
                        tempFormData.description.error
                          ? "Enter description!"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      name="price"
                      fullWidth
                      id="name"
                      label="Price*"
                      placeholder="$ 100"
                      onChange={handleChangeInput}
                      value={tempFormData.price}
                      error={tempFormData.price.error}
                      helperText={
                        tempFormData.price.error ? "Enter price!" : ""
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="file"
                      name="image"
                      fullWidth
                      id="image"
                      onChange={handleFileInput}
                      error={tempFormData.image.error}
                      helperText={
                        tempFormData.image.error ? "Enter image!" : ""
                      }
                    />
                    {/* <span style={{ margin: 10 }}>{tempFormData.image}</span> */}
                  </Grid>

                  {tempFormData.image["type"] === "image/png" ||
                  tempFormData.image["type"] === "image/jpg" ? (
                    <Grid item xs={12}>
                      <img
                        src={URL.createObjectURL(tempFormData.image)}
                        width={300}
                        height={300}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
                <Button
                  sx={{ mt: 5 }}
                  type="submit"
                  variant="outlined"
                  color="primary"
                >
                  {isUpdate ? "Update" : "Add"}
                </Button>
              </FormControl>
            </form>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Form;

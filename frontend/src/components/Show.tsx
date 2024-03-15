import { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductDataContext";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

interface Props {
  id: string;
}

const Show: React.FC<Props> = ({ id }) => {
  const Product = useContext(ProductContext);

  const [data] = Product.formData.filter((val) => {
    return val.id === id;
  });

  useEffect(() => {
    document.title = `product - ${data.productName}`;
  }, [data.productName]);

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ marginTop: "50px" }}>
        <Card
          variant="elevation"
          elevation={10}
          sx={{ maxWidth: 645, borderRadius: "16px" }}
        >
          <CardMedia
            component="img"
            alt="product image"
            height="280"
            image={`http://localhost:5000/${data.image}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.description}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              $ {data.price}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Show;

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, CardMedia } from "@mui/material";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCardAction = (product) => {
    const payload = {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product?.imageUrl,
    };
    dispatch(addToCart(payload));
    toast("Added to shopping cart");
  };
  return (
    <>
      <Item>
        <Box>
          <CardMedia
            component="img"
            height="194"
            image={product?.imageUrl}
            alt={product?.name}
          />
          <h3>{product?.name}</h3>
          <h3>{product?.description}</h3>
          <h4 style={{ color: "#1976d2" }}>
            {product?.categoryIds?.map((val) => val.name + "  ")}
          </h4>
          <Box sx={{ fontWeight: "bold" }}>
            <h3>R${product?.price}</h3>
          </Box>
          <Box>
            <Button onClick={() => addToCardAction(product)}>
              {" "}
              Adicionar{" "}
            </Button>
          </Box>
        </Box>
      </Item>
    </>
  );
};

export default ProductCard;

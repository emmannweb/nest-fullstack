import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, CardMedia } from "@mui/material";

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

//simulation to add to cart
const cartItems = [];
const addToCart = (id) => {
  cartItems.push(id);
  let uniqueIds = [...new Set(cartItems)];
  localStorage.setItem("cartItems", JSON.stringify(uniqueIds));
};

const ProductCard = ({
  name,
  description,
  imageUrl,
  price,
  id,
  categoryIds,
}) => {
  return (
    <>
      <Item>
        <Box>
          <CardMedia
            component="img"
            height="194"
            image={imageUrl}
            alt="Paella dish"
          />
          {/* <image src={`${imageUrl}`} alt={name} /> */}
          <h3>{name}</h3>
          <h3>{description}</h3>
          <h4 style={{ color: "#1976d2" }}>
            {categoryIds?.map((val) => val.name + "  ")}
          </h4>
          <Box sx={{ fontWeight: "bold" }}>
            <h3>R${price}</h3>
          </Box>
          <Box>
            <Button onClick={() => addToCart(id)}> Adicionar </Button>
          </Box>
        </Box>
      </Item>
    </>
  );
};

export default ProductCard;

import Header from "../component/Header";
import Footer from "../component/Footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import useFetchData from "../hooks/useFetchData";
import ProductCard from "../component/ProductCard";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = () => {
  const { data, loading, error } = useFetchData("/product");

  const { cartItems } = useSelector((state) => state.cart);

  const Ids = cartItems.reduce((acc, curr) => {
    if (Array.isArray(curr) && curr.length === 0) {
      return acc;
    } else {
      return [...acc, curr.product];
    }
  }, []);

  const simulateOrder = async () => {
    try {
      const order = await axios.post("/order", {
        productIds: Ids,
      });
      console.log(order);
      localStorage.removeItem("cartItems");
      toast("Order created");
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return <h3>Error: {error.message}</h3>;

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "calc(100vh - 140px)",
          bgcolor: "#fafbfb",
        }}
      >
        <Container sx={{ pb: 5 }}>
          <Box sx={{ display: "flex", justifyContent: "right", pt: 3 }}>
            <Button
              variant="outlined"
              disabled={cartItems.length === 0}
              onClick={() => simulateOrder()}
            >
              Simulate order
            </Button>
          </Box>
          {loading ? (
            <div className="container">
              <h3>Loading...</h3>
            </div>
          ) : data?.length === 0 ? (
            <>
              <h3>Nenhum produto cadastrado!</h3>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, pt: 2 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {data?.map((product, id) => (
                  <Grid key={id} size={{ xs: 2, sm: 4, md: 4 }}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Home;

import Header from "../component/Header";
import Footer from "../component/Footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import useFetchData from "../hooks/useFetchData";
import ProductCard from "../component/ProductCard";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import axios from "axios";

const Home = () => {
  const { data, loading, error } = useFetchData("/product");

  //get array ids of product from localstorage
  const idsArrayProducts = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

  const simulateOrder = async () => {
    try {
      const order = await axios.post("/order", {
        productIds: idsArrayProducts,
      });
      console.log(order);
      localStorage.removeItem("cartItems");
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
        <Container>
          <Box sx={{ display: "flex", justifyContent: "right", pt: 3 }}>
            <Button
              variant="outlined"
              disabled={idsArrayProducts.length === 0}
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
                    <ProductCard
                      name={product.name}
                      description={product.description}
                      imageUrl={product.imageUrl}
                      price={product.price}
                      categoryIds={product.categoryIds}
                      id={product._id}
                    />
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

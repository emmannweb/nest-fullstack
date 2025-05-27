import AdminLayout from "../../component/AdminLayout";
import { Box, Card, Stack, Typography } from "@mui/material";
import DashboardCard from "../../component/DashboardCard";
import useFetchData from "../../hooks/useFetchData";
import { Chart } from "react-google-charts";
import FilterNumberOfOrders from "../../component/FilterNumberOfOrders";
import { useState } from "react";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SortIcon from "@mui/icons-material/Sort";
import CategoryIcon from "@mui/icons-material/Category";

const Dashboard = () => {
  //filter number of orders by interval of days
  const [numberOfOrders, setNumberOfOrders] = useState("30days");
  const { data: dataFilter } = useFetchData(`/order/filter/${numberOfOrders}`);

  const { data, loading } = useFetchData("/order/summary/total");

  const { data: categoryCount } = useFetchData("/category/count/result");

  const { products, medianValuePerOrder, orders, daylyOrders } = data;

  const daylyOrdersStat =
    daylyOrders && daylyOrders?.length > 0 ? daylyOrders : [];

  const options = {
    chart: {
      title: "Venda por dia",
      legend: { position: "bottom" },
      curveType: "function",
    },
  };

  const handleChangeNumberOrders = (event) => {
    setNumberOfOrders(event.target.value);
  };

  return (
    <>
      <AdminLayout>
        <Box sx={{ pt: 3 }}>
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ pb: 4 }}
              >
                <DashboardCard
                  value={
                    products && products[0]?.nbProducts
                      ? products[0]?.nbProducts
                      : 0
                  }
                  icon={
                    <Inventory2Icon
                      sx={{
                        color: "oklch(0.218022 0.040901 233.565)",
                        fontSize: 30,
                      }}
                    />
                  }
                  description="Produtos"
                  money=""
                />
                <DashboardCard
                  value={
                    medianValuePerOrder && medianValuePerOrder[0]?.average
                      ? medianValuePerOrder[0]?.average?.toFixed(2)
                      : 0
                  }
                  icon={
                    <LocalGroceryStoreIcon
                      sx={{
                        color: "oklch(0.218022 0.040901 233.565)",
                        fontSize: 30,
                      }}
                    />
                  }
                  description="Valor medio por pedido"
                  money=""
                />
                <DashboardCard
                  value={orders && orders[0] ? orders[0]?.numberOrders : 0}
                  icon={
                    <ListAltIcon
                      sx={{
                        color: "oklch(0.218022 0.040901 233.565)",
                        fontSize: 30,
                      }}
                    />
                  }
                  description="Quantidade de pedidos"
                  money=""
                />
                <DashboardCard
                  value={orders && orders[0] ? orders[0]?.totalSales : 0}
                  icon={
                    <AttachMoneyIcon
                      sx={{
                        color: "oklch(0.218022 0.040901 233.565)",
                        fontSize: 30,
                      }}
                    />
                  }
                  description="Valor total dos pedidos"
                  money="R$"
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <DashboardCard
                  value={categoryCount}
                  icon={
                    <CategoryIcon
                      sx={{
                        color: "oklch(0.218022 0.040901 233.565)",
                        fontSize: 30,
                      }}
                    />
                  }
                  description="quantidade de categoria"
                  money=""
                />

                <DashboardCard
                  value={
                    dataFilter && dataFilter?.length === 0
                      ? 0
                      : dataFilter[0]?.result
                  }
                  icon={
                    <SortIcon
                      sx={{
                        color: "oklch(0.218022 0.040901 233.565)",
                        fontSize: 30,
                      }}
                    />
                  }
                  description="numeros de pedidos"
                  money=""
                />

                <Card
                  sx={{ bgcolor: "oklch(0.218022 0.040901 233.565)", p: 2 }}
                >
                  <Typography component="h6" sx={{ color: "#fafafa" }}>
                    Filtrar a quantidade de pedidos para: Hoje, nos últimos 7
                    dias e 30 dias.
                  </Typography>
                  <FilterNumberOfOrders
                    numberOfOrders={numberOfOrders}
                    handleChangeNumberOrders={handleChangeNumberOrders}
                  />
                </Card>
              </Stack>

              <Box sx={{ pt: 3 }}>
                <h2>Venda por dia:</h2>
                {daylyOrdersStat && daylyOrdersStat?.length === 0 ? (
                  <>
                    <h2>No Order yet to show graph!</h2>
                  </>
                ) : (
                  <Chart
                    chartType="LineChart"
                    data={[
                      ["Data", "Venda em R$"],
                      ...daylyOrdersStat.map((val) => [val._id, val.sales]),
                    ]}
                    width="100%"
                    height="400px"
                    options={options}
                  />
                )}
              </Box>
            </>
          )}
        </Box>
      </AdminLayout>
    </>
  );
};

export default Dashboard;

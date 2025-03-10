import AdminLayout from "../../component/AdminLayout";
import useFetchData from "../../hooks/useFetchData";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import { useState } from "react";
import OrderModalEdit from "../../component/OrderModalEdit";
import axios from "axios";

const Order = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  //trigger edit order
  const handleOpenEditForm = (id) => {
    setOpen(true);
    setId(id);
  };
  const { data, loading, error, refetch } = useFetchData("/order");

  if (error) return <h3>Error: {error.message}</h3>;

  const deleteOrder = async (id) => {
    try {
      if (window.confirm(`Voce quer deletar esse produto ID: "${id}" ?`)) {
        const value = await axios.delete(`/product/${id}`);
        console.log(value);
      }
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID Pedido",
      width: 250,
      editable: true,
    },
    {
      field: "productIds",
      headerName: "Produto(s)",
      width: 300,
      valueGetter: (data) => data.map((val) => val?.name + "   "),
    },

    {
      field: "total",
      headerName: "Preço total",
      width: 150,
      renderCell: (params) => "R$" + params.row.total,
    },

    {
      field: "date",
      headerName: "Data de criação",
      sortable: false,
      width: 160,
      renderCell: (params) => params.row.date?.substring(0, 10),
    },

    {
      field: "Ações",
      width: 200,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "70px",
          }}
        >
          <Box>
            <EditIcon
              sx={{
                color: "oklch(0.218022 0.040901 233.565)",
                cursor: "pointer",
              }}
              onClick={() => handleOpenEditForm(values.row._id)}
            />
          </Box>
          <Box>
            <AutoDeleteIcon
              onClick={() => deleteOrder(values.row._id)}
              sx={{ color: "red", cursor: "pointer" }}
            />
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <>
      <AdminLayout>
        <OrderModalEdit open={open} setOpen={setOpen} id={id} />
        <h2>Orders</h2>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 12,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            loading={loading}
          />
        </Box>
      </AdminLayout>
    </>
  );
};

export default Order;

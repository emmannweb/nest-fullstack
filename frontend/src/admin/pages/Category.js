import AdminLayout from "../../component/AdminLayout";
import useFetchData from "../../hooks/useFetchData";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import CategoryModal from "../../component/CategoryModal";
import CategoryModalEdit from "../../component/CategoryModalEdit";

const Category = () => {
  //fetch categories
  const { data, loading, error, refetch } = useFetchData("/category");

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenEditForm = (id) => {
    setEdit(true);
    setId(id);
  };
  if (error) return <h3>Error: {error.message}</h3>;

  const deleteCategory = async (id) => {
    try {
      if (window.confirm(`Voce quer deletar essa categoria ID: "${id}" ?`)) {
        const value = await axios.delete(`/category/${id}`);
        console.log(value);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID Categoria",
      width: 150,
      editable: true,
    },
    {
      field: "name",
      headerName: "Nome da Categoria",
      width: 150,
      editable: true,
    },

    {
      field: "createdAt",
      headerName: "Data de criação",
      sortable: false,
      width: 160,
      renderCell: (params) => params.row.createdAt?.substring(0, 10),
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
              onClick={() => handleOpenEditForm(values.row._id)}
              sx={{
                color: "oklch(0.218022 0.040901 233.565)",
                cursor: "pointer",
              }}
            />
          </Box>
          <Box>
            <AutoDeleteIcon
              onClick={() => deleteCategory(values.row._id)}
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
        <CategoryModal open={open} setOpen={setOpen} refetch={refetch} />
        <CategoryModalEdit
          edit={edit}
          setEdit={setEdit}
          id={id}
          refetch={refetch}
        />
        <Box sx={{ display: "flex", justifyContent: "right", pb: 3 }}>
          <Button
            loadingPosition="start"
            startIcon={<AddCircleIcon />}
            variant="outlined"
            onClick={handleOpen}
          >
            Adicionar
          </Button>
        </Box>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
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

export default Category;

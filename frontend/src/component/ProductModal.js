import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, MenuItem } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import useFetchData from "../hooks/useFetchData";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";

const validationSchema = yup.object({
  name: yup
    .string("Adicionar nome do produto")
    .min(4, "tem que ter no minimo 3 letras")
    .required("obrigatório"),
  description: yup
    .string("Adicionar descrição do produto")
    .min(10, "tem que ter no minimo 10 letras")
    .required("obrigatório"),
  price: yup.number("Adicionar preço do produto").required("obrigatório"),
  categoryIds: yup
    .string("Adicionar categoria do produto")
    .required("obrigatória"),
  imageUrl: yup.string("required").required("obrigatória"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ProductModal({ open, setOpen, refetch }) {
  const [loading, setLoading] = useState(false);

  const { data: categories } = useFetchData("/category");

  function handleClose() {
    setOpen(false);
  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      categoryIds: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      await createNewProduct(values);
      //alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  const createNewProduct = async (values) => {
    setLoading(true);
    const formData = new FormData();
    try {
      formData.append("imageUrl", values.imageUrl);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("categoryIds", values.categoryIds);

      // eslint-disable-next-line
      const { data } = await axios.post("/product", formData);
      refetch();
      //toast.success("post created");
    } catch (error) {
      console.log(error);
      //toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            sx={{
              mb: 3,
              mt: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },

              input: {
                background: "#eee",
              },
            }}
            fullWidth
            id="name"
            name="name"
            placeholder="Nome do produto"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            sx={{
              mb: 3,
              mt: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },

              input: {
                background: "#eee",
              },
            }}
            fullWidth
            id="description"
            name="description"
            placeholder="Descrição do produto"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
          <TextField
            sx={{
              mb: 3,
              mt: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },

              input: {
                background: "#eee",
              },
            }}
            fullWidth
            type="number"
            id="price"
            name="price"
            placeholder="Preço do produto"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.name}
          />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            className="px-2 my-2"
            variant="outlined"
            name="categoryIds"
            id="categoryIds"
            select
            label="Categorias"
            value={values.categoryIds}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.categoryIds && Boolean(errors.categoryIds)}
            helperText={touched.categoryIds && errors.categoryIds}
          >
            {categories &&
              categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
          </TextField>

          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Escolher Imagem
            <input
              name="imageUrl"
              accept="image/*"
              id="imageUrl"
              type="file"
              hidden
              onChange={(e) => {
                if (e.currentTarget.files) {
                  setFieldValue("imageUrl", e.currentTarget.files[0]);
                }
              }}
            />
          </Button>
          <Box sx={{ pt: 2 }}>
            <Button
              type="submit"
              size="large"
              color="primary"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              Criar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

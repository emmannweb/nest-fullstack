import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
//import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import useFetchSingleData from "../hooks/useFetchSingleData";
import ChooseMultipleCategory from "./ChooseMultipleCategory";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// const validationSchema = yup.object({
//   name: yup
//     .string("Adicionar nome da categoria")
//     .min(4, "tem que ter no minimo 3 letras")
//     .required("obrigatório"),
//   description: yup
//     .string("Adicionar descrição do produto")
//     .min(10, "tem que ter no minimo 10 letras")
//     .required("obrigatório"),
//   price: yup.number("Adicionar preço do produto").required("obrigatório"),
//   categoryIds: yup
//     .string("Adicionar categoria do produto")
//     .required("obrigatória"),
//   imageUrl: yup.string("required").required("obrigatória"),
// });

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

export default function ProductModalEdit({ edit, setEdit, id, refetch }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { data: singleProduct } = useFetchSingleData(`/product/${id}`);

  const handleClose = () => setEdit(false);

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
      _id: singleProduct && singleProduct._id ? singleProduct._id : "",
      name: singleProduct && singleProduct.name ? singleProduct.name : "",
      description:
        singleProduct && singleProduct.description
          ? singleProduct.description
          : "",
      price: singleProduct && singleProduct.price ? singleProduct.price : "",
      categoryIds: [],
      imageUrl:
        singleProduct && singleProduct.imageUrl ? singleProduct.imageUrl : "",
    },

    //validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      await editProduct(values);
      // alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  const handleChangeCategory = ({ id }) => {
    setCategories((prevSelected) => {
      // if it's in, remove
      const newArray = [...prevSelected];
      if (newArray.includes(id)) {
        return newArray.filter((item) => item !== id);
      } else {
        newArray.push(id);
        return newArray;
      }
    });
  };

  //synchronize the categoryIds with the fields updated values
  useEffect(() => {
    setFieldValue("categoryIds", categories);
    // eslint-disable-next-line
  }, [categories?.length]); // observe categoryIds

  const editProduct = async (values) => {
    setLoading(true);

    try {
      // eslint-disable-next-line
      const { data } = await axios.patch(`/product/${values._id}`, values);
      refetch();
      //toast.success("post created");
    } catch (error) {
      console.log(error?.message);
      //toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={edit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
          <Typography variant="h5"> Alterar produto</Typography>
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
            placeholder="Nome da categoria"
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
            placeholder="description"
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
            id="price"
            name="price"
            type="number"
            placeholder="preco do produto"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
          />

          <ChooseMultipleCategory
            handleChangeCategory={handleChangeCategory}
            categories={categories}
          />

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
              Alterar produto
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

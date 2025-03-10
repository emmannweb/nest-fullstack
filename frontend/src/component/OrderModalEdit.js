import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import useFetchSingleData from "../hooks/useFetchSingleData";

const validationSchema = yup.object({
  name: yup
    .string("Adicionar nome da categoria")
    .min(4, "tem que ter no minimo 3 letras")
    .required("obrigatório"),
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

export default function OrderModalEdit({ open, setOpen, id }) {
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useFetchSingleData(`/order/${id}`);

  const handleClose = () => setOpen(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        total: data && data.total ? data.total : "",
        _id: data && data._id ? data._id : "",
      },

      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, actions) => {
        await editCategory(values);
        //alert(JSON.stringify(values, null, 2));
        actions.resetForm();
      },
    });

  const editCategory = async (values) => {
    setLoading(true);
    try {
      // eslint-disable-next-line
      const { data } = await axios.patch(`/order/${values._id}`, values);
      //toast.success("post created");
      refetch();
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
          <Typography variant="h5"> Alterar Pedido</Typography>
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
            id="total"
            name="total"
            placeholder="Nome da categoria"
            value={values.total}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.total && Boolean(errors.total)}
            helperText={touched.total && errors.total}
          />

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
              Alterar pedido
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

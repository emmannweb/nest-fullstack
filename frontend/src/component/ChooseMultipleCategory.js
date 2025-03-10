import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import useFetchData from "../hooks/useFetchData";
import { Box } from "@mui/material";

export default function ChooseMultipleCategory({
  handleChangeCategory,
  categories,
}) {
  const { data } = useFetchData("/category");

  return (
    <Box>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Box sx={{ pb: 3 }}>
          <InputLabel
            id="demo-multiple-checkbox-label"
            sx={{ fontSize: "18px" }}
          >
            Categorias
          </InputLabel>
        </Box>

        {data &&
          data.map((cat) => {
            const isSelected = categories.includes(cat._id);
            return (
              <MenuItem
                key={cat._id}
                value={cat._id}
                onClick={() => handleChangeCategory({ id: cat._id })}
              >
                <Checkbox checked={isSelected} />
                <ListItemText primary={cat.name} />
              </MenuItem>
            );
          })}
      </FormControl>
    </Box>
  );
}

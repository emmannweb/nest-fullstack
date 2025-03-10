import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterNumberOfOrders({
  numberOfOrders,
  handleChangeNumberOrders,
}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth sx={{ color: "#c1c1c1" }}>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            borderColor: "#c1c1c1!important",
            "&:.MuiInputLabel-outlined": {
              borderColor: "red!important",
            },
          }}
        >
          Pedidos
        </InputLabel>
        <Select
          sx={{ color: "#c1c1c1" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={numberOfOrders}
          label="Pedidos"
          onChange={handleChangeNumberOrders}
        >
          <MenuItem value="30days">30 dias</MenuItem>
          <MenuItem value="7days">7 dias</MenuItem>
          <MenuItem value="today">Hoje</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

import { Card, CardContent, IconButton, Typography } from "@mui/material";

const DashboardCard = ({ value, icon, description, money }) => {
  return (
    <>
      <Card sx={{ bgcolor: "oklch(0.218022 0.040901 233.565)", width: "100%" }}>
        <CardContent>
          <IconButton sx={{ bgcolor: "#b5d3f1", mb: 2 }}>{icon}</IconButton>
          <Typography
            variant="h4"
            sx={{ color: "#fafafa", mb: "1px", fontWeight: 700 }}
          >
            {money !== "" ? money + value : value}
          </Typography>
          <Typography variant="body2" sx={{ color: "#b5d3f1", mb: 0 }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardCard;

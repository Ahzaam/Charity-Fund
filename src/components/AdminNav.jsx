import * as React from "react";
import Box from "@material-ui/core/Box";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { useNavigate } from "react-router-dom";
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();


  
  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" onClick={() => navigate("/")} />
        <BottomNavigationAction
          label="Scan"
          onClick={() => navigate("/scanqr/monthlycollection/default")}
        />
        <BottomNavigationAction
          label="List"
          onClick={() => navigate("/list")}
        />
        <BottomNavigationAction
          label="New"
          onClick={() => navigate("/addnew")}
        />
      </BottomNavigation>
    </Box>
  );
}

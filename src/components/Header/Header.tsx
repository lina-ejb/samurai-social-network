import React from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Switch from "../common/Switcher/Switch";
import "./PlainCssHeader.css";
import img from '../../assets/images/headerLogo.png'

type HeaderPropsType = {
  login?: string | null
  isAuth?: boolean | undefined
  logOut?: () => void
}

const Header = (props: HeaderPropsType) => {
  const navigate = useNavigate();


  return (

    < >
      <AppBar sx={{
        background: "#2B6E99"
      }} id={"header"}>
        <Toolbar>
          <img alt="logo"
               src={img} />
          <Box sx={{ paddingLeft: "25px" }}><Switch /></Box>
          <Typography variant="h6" sx={{ margin: "auto" }}>
          </Typography>

          <Box >
            {props.isAuth
              ? <Box id={"login"} sx={{ fontWeight: "bold" }}>{props.login}<Button
                sx={{ backgroundColor: "#004898" }}
                size="small"
                variant="contained"
                component="button"
                onClick={props.logOut}
              >Log out</Button></Box> : <Box><Button
                sx={{ backgroundColor: "#004898" }}
                size="small"
                variant="contained"
                component="button"
                onClick={() => navigate("/login")}
              >Log in</Button>
              </Box>}

          </Box>

        </Toolbar>
      </AppBar>
    </>

  );
};

export default Header;
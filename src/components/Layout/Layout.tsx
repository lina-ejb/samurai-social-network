import React, { ReactNode } from "react";
import { Box, styled } from "@mui/system";
import { Toolbar } from "@mui/material";
import { PersistentDrawerLeft } from "../PersistentDrawerLeft";
import { Main } from "../Main";
import { Footer } from "../Footer";
import { ErrorSnackbar } from "../ErrorSnackbar/ErrorSnackbar";
import HeaderContainer from "../Header/HeaderContainer";


const OuterContainer = styled(Box)`
  display: flex;
  overflow: hidden;
  height: inherit;
  flex-direction: column;
  min-height: 100vh;
`;
const InnerContainer = styled(Box)`
  display: flex;
  flex: 1;
  overflow: hidden;
  height: inherit;
  background-color: #f2edf3;
`;

interface ILayoutProps {
    children: NonNullable<ReactNode>;
}



export const Layout = ({children}: ILayoutProps) => {

    return (
        <div>
            <ErrorSnackbar/>
            <OuterContainer>
              <HeaderContainer/>

                <Toolbar/>
                <InnerContainer>
                    <PersistentDrawerLeft />
                    <Main>{children}</Main>
                </InnerContainer>
                <Footer></Footer>
            </OuterContainer>

        </div>
    );
};


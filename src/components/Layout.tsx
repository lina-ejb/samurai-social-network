import React, {ReactNode} from 'react';
import {Box, styled} from "@mui/system";
import Header from "./Header";
import {Toolbar} from "@mui/material";
import {PersistentDrawerLeft} from "./PersistentDrawerLeft";
import {Main} from "./Main";
import {Footer} from "./Footer";


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
            <OuterContainer>
                <Header/>
                <Toolbar/>
                <InnerContainer>
                    <PersistentDrawerLeft/>
                    <Main>{children}</Main>
                </InnerContainer>
               <Footer></Footer>
            </OuterContainer>

        </div>
    );
};


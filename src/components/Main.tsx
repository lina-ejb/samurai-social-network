import {PropsWithChildren} from "react";
import {styled} from "@mui/system";

const StyledMain = styled('main')`
  height: 100%;
  flex: 1;
  padding: 10px;
 
`;

export const Main = ({ children }: PropsWithChildren<unknown>) => (
    <StyledMain>
        {children}
    </StyledMain>
);

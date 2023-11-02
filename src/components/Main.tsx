import { PropsWithChildren } from "react";
import { styled } from "@mui/system";

const StyledMain = styled("main")`
  flex: 1;
 
`;

export const Main = ({ children }: PropsWithChildren<unknown>) => (
  <StyledMain>
    {children}
  </StyledMain>
);

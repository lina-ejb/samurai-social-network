import { PropsWithChildren } from "react";
import { styled } from "@mui/system";

const StyledMain = styled("main")`
  flex: 1;
  background-color: var(--background);
`;

export const Main = ({ children }: PropsWithChildren<unknown>) => (
  <StyledMain>
    {children}
  </StyledMain>
);

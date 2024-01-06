import { ReactNode } from "react";
import { Box, styled } from "@mui/material";
import { DrawerContextProvider } from "./contexts/drawer-context";
import Header from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { Drawer } from "./components/Drawer";
import { useLocation } from "react-router-dom";
import LoginPage from "./Login";
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
  margin-top: 126px;
`;

interface ILayoutProps {
  children: NonNullable<ReactNode>;
}

export const Layout = ({ children }: ILayoutProps) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isAuthenticated = sessionStorage.getItem("userDetails");
  return (
    <DrawerContextProvider>
      {isLoginPage || !isAuthenticated ? (
        <LoginPage />
      ) : (
        <OuterContainer>
          <Header />
          {/* <Toolbar /> */}
          <InnerContainer>
            <Drawer />
            <Main>{children}</Main>
          </InnerContainer>
          <Footer>Footer</Footer>
        </OuterContainer>
      )}
    </DrawerContextProvider>
  );
};

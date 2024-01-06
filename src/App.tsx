import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoutes from "./appRoutes";
import UserContextProvider from "./features/PDFGenerator/contexts/UserContext";
import { Layout } from "./features/common/Layout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./features/common/util/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContextProvider>
        <GoogleOAuthProvider clientId="35603378190-n5a7bbg1j9g8uh5l3igm6d66fe7v2k99.apps.googleusercontent.com">
          <Layout>
            <AppRoutes />
          </Layout>
        </GoogleOAuthProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;

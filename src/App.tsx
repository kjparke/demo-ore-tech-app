import { AuthProvider } from "./auth/AuthContext";
import { AssetProvider } from "./context/AssetContext";
import Routes from "./routes/Routes";
import Layout from "./layouts/Layout";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AssetProvider>
          <Layout>
            <Routes />
          </Layout>
        </AssetProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;

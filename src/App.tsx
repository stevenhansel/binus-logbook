import { lazy, Suspense } from "react";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

import routes from "./constants/routes";

import ErrorFallback from "./pages/ErrorFallback";

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Suspense fallback={<ErrorFallback />}>
        <Routes>
          <Route path={routes.home} element={<Login />} />
          <Route path={routes.login} element={<Home />} />
        </Routes>
      </Suspense>
    </MantineProvider>
  );
}

export default App;

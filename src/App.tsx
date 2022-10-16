import { lazy, Suspense } from "react";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

import routes from "./constants/routes";

import ErrorFallback from "./pages/ErrorFallback";

import useStore from "./stores";

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))

function App() {
  const isAuth = useStore((state) => state.isAuth)

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Suspense fallback={<ErrorFallback />}>
        {!isAuth && (
          <Routes>
            <Route path={routes.login} element={<Login />} />
          </Routes>
        )}
        {isAuth && (
          <Routes>
            <Route path={routes.home} element={<Home />} />
          </Routes>
        )}
      </Suspense>
    </MantineProvider>
  );
}

export default App;

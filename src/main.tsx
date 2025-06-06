import { createRoot } from "react-dom/client";
import ErrorBoundary from "./modules/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.ts";
import Pages from "./routes";
import { GlobalStyle } from "./styles/globalStyle.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
        <ToastContainer position={"bottom-left"} />
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
);

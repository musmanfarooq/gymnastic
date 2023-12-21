import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const querClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={querClient}>
        <Component {...pageProps} />
        <ToastContainer draggable />
      </QueryClientProvider>
    </>
  );
}

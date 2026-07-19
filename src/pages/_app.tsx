import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import FilterProvider from "../hooks/controllers/useFilterController";
import TagProvider from "../hooks/controllers/useTagController";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <TagProvider>
          <Component {...pageProps} />
        </TagProvider>
      </FilterProvider>
    </QueryClientProvider>
  );
}

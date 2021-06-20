import { ChakraProvider } from "@chakra-ui/react";
import { wrapper } from "../app/store";
import AuthProvider from "../shared/contexts/Auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);

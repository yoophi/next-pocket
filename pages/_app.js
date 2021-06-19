import { wrapper } from "../app/store";
import AuthProvider from "../shared/contexts/Auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default wrapper.withRedux(MyApp);

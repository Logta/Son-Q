import "../styles/globals.css";
import { GlobalContainer } from "../src/components/containers";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContainer>
      <Component {...pageProps} />
    </GlobalContainer>
  );
}

export default MyApp;

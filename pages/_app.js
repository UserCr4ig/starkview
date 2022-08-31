import "../styles/globals.css";
import { SWRConfig } from "swr";
import "react-static-tweets/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 900000,
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;

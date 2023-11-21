import { component$, Slot} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import {Header} from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";

//import styles from "./styles.css?inline";
//import { text } from "stream/consumers";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 1,
  });
};




export default component$(() => {
 
  //useStyles$(styles);
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
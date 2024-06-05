import Image from "next/image";
import styles from "./page.module.css";

import Home from "./home/page";

export default function Root() {
  return (
    // <main className={styles.main}>
    //   <div>
    //     <Home />
    //   </div>
    // </main>
    <div style={{ minHeight: "100vh" }}>
      <Home />
    </div>
  );
}

import Image from "next/image";
import styles from "./page.module.css";

import Home from "./home/page";
import RequestForm from "./requestForm/page";

export default function Root() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <RequestForm />
    </div>
  );
}

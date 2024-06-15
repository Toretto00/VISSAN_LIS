"use client";

import Image from "next/image";

import Style from "./loadingPage.module.scss";

const LoadingPage = () => {
  return (
    <div className="animate__animated animate__pulse animate__infinite">
      <div className={Style.container}>
        <Image
          className={Style.logo}
          priority
          src={"/logo-vissan.png"}
          alt="loading logo"
          width={238}
          height={210}
        />
      </div>
    </div>
  );
};
export default LoadingPage;

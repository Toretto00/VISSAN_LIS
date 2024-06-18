"use client";

import { useRouter } from "next/navigation";

import { Button } from "@mui/material";

import Style from "../sideBarBtn/sideBarBtn.module.scss";

const SideBarButon = (props: any) => {
  const router = useRouter();

  const handleButtonClick = (name: string) => {
    props.onFocus(name);
    router.push(props.link);
  };

  return (
    <div className={Style.container}>
      <Button
        className={Style.btn}
        disabled={props.focus === props.name ? true : false}
        sx={{
          backgroundColor:
            props.focus === props.name ? "#fe0302" : "transparent",
        }}
        onClick={() => {
          handleButtonClick(props.name);
        }}
      >
        <div
          className={Style.icon}
          style={{ color: props.focus === props.name ? "white" : "#5C5967" }}
        >
          {props.icon}
        </div>
        <div
          style={{
            opacity: props.open ? 1 : 0,
            color: props.focus === props.name ? "white" : "#5C5967",
          }}
        >
          {props.name}
        </div>
      </Button>
    </div>
  );
};

export default SideBarButon;

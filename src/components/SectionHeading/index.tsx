import { Typography } from "@mui/material";
import React from "react";

function Sectionheading({ text }: { text: string }) {
  return (
    <div
      className="w-full text-center h-[100px] flex items-center justify-center"
      style={{
        background: `url("/images/PolygonPrimaryColor.png") no-repeat center`,
        backgroundSize: "contain",
      }}
    >
      <Typography className="text-3xl">{text}</Typography>
    </div>
  );
}

export default Sectionheading;

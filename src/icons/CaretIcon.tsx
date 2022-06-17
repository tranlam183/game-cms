import React, { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const CaretIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M6.1018 8C5.02785 8 4.45387 9.2649 5.16108 10.0731L10.6829 16.3838C11.3801 17.1806 12.6197 17.1806 13.3169 16.3838L18.8388 10.0731C19.5459 9.2649 18.972 8 17.898 8H6.1018Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(CaretIcon);

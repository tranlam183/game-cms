import React, { memo } from "react";
import {
  Tooltip,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  TooltipProps,
  Zoom,
} from "@mui/material";

export type IconButtonProps = {
  textTooltip?: string;
  tooltipProps?: TooltipProps;
} & MuiIconButtonProps;

const defaultIconButtonProps = {
  tooltipProps: {},
};

const IconButton = (props: IconButtonProps) => {
  const { textTooltip, tooltipProps, ...rest } = props;

  const renderIconButton = () => {
    return (
      <MuiIconButton
        sx={{
          width: "fit-content",
          ...rest?.sx,
        }}
        {...rest}
      />
    );
  };

  if (Boolean(textTooltip)) {
    return (
      <Tooltip
        title={textTooltip as string}
        placement="top-end"
        arrow
        TransitionComponent={Zoom}
        {...tooltipProps}
      >
        {renderIconButton()}
      </Tooltip>
    );
  }

  return renderIconButton();
};

IconButton.defaultProps =
  defaultIconButtonProps as unknown as Partial<IconButtonProps>;

export default memo(IconButton);

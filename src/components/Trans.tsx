import { Box, Button, ButtonProps } from "@mui/material";
import Link, { LinkProps } from "components/Link";
import React, { memo } from "react";
import { Trans as I18nTrans } from "react-i18next";
import Text, { TextProps } from "./shared/Text";

type TransProps = {
  linkProps: LinkProps;
  buttonProps?: ButtonProps;
  textProps?: TextProps;

  children?: React.ReactNode;
  components?:
    | readonly React.ReactNode[]
    | { readonly [tagName: string]: React.ReactNode };
  count?: number;
  context?: string;
  defaults?: string;
  i18nKey?: string;
  ns?: string;
  values?: object;
  shouldUnescape?: boolean;
};

const Trans = ({ linkProps, buttonProps, textProps, ...rest }: TransProps) => {
  const { href, ...restLinkProps } = linkProps;

  return (
    <Box
      component={I18nTrans}
      components={{
        bold: <strong />,
        a: (
          <Link
            href={href}
            target="_blank"
            underline="none"
            color="inherit"
            {...restLinkProps}
          />
        ),
        typography: <Text {...textProps} />,
        button: <Button disableRipple {...buttonProps} />,
        br: <br />,
      }}
      {...rest}
    />
  );
};

export default memo(Trans);

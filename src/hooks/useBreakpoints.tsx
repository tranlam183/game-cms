import { useMemo } from "react";
import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

const useBreakpoints = () => {
  const theme = useTheme();
  const isXsSmaller = useMediaQuery(
    theme.breakpoints.down(BreakpointsOptions.xs),
  );
  const isSmSmaller = useMediaQuery(
    theme.breakpoints.down(BreakpointsOptions.sm),
  );
  const isLgSmaller = useMediaQuery(
    theme.breakpoints.down(BreakpointsOptions.lg),
  );
  const isXlSmaller = useMediaQuery(
    theme.breakpoints.down(BreakpointsOptions.xl),
  );

  const ratio = useMemo(() => {
    switch (true) {
      case Boolean(isSmSmaller):
        return BreakpointsOptions.sm;
      case Boolean(isLgSmaller):
        return BreakpointsOptions.lg;
      case Boolean(isXlSmaller):
        return BreakpointsOptions.xl;
      case Boolean(isXsSmaller):
      default:
        return BreakpointsOptions.xs;
    }
  }, [isXsSmaller, isSmSmaller, isLgSmaller, isXlSmaller]);

  return {
    currentRatio: ratio,
  };
};

export default useBreakpoints;

export const BreakpointsOptions: { [key: string]: Breakpoint } = {
  xs: "xs",
  sm: "sm",
  lg: "lg",
  xl: "xl",
};

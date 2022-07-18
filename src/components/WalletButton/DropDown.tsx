import React, { memo, useState, MouseEvent } from "react";
import {
  ButtonProps,
  Menu,
  MenuItem,
  menuItemClasses,
  MenuProps,
  Palette,
  Stack,
  MenuItemProps,
  IconButton,
  IconButtonProps,
  Typography,
  menuClasses,
} from "@mui/material";
import { Option } from "constant/types";

type DropdownProps = {
  label?: string;
  onChange: (option: Option) => void;
  options: Option[];
  buttonProps?: ButtonProps | IconButtonProps;
  menuProps?: Omit<MenuProps, "open">;
  menuItemProps?: MenuItemProps;
  value?: string | number;
};

const Dropdown = (props: DropdownProps) => {
  const {
    onChange,
    options,
    buttonProps = {},
    menuProps = {},
    menuItemProps = {},
    ...rest
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onOpenDropdown = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onChangeOption = (option: Option) => {
    return () => {
      onChange(option);
      onClose();
    };
  };

  return (
    <Stack {...rest}>
      <IconButton
        onClick={onOpenDropdown}
        {...(buttonProps as IconButtonProps)}
      >
        {buttonProps.children}
      </IconButton>

      <Menu
        MenuListProps={{
          "aria-labelledby": BUTTON_MENU_ID,
        }}
        id={MENU_ID}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        sx={sxConfigs.menu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        {...menuProps}
      >
        {options.map((option) => (
          <MenuItem
            sx={sxConfigs.menuItem}
            key={option.value}
            onClick={onChangeOption(option)}
            {...menuItemProps}
          >
            <Typography variant="body2" color="text.white">
              {option.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default memo(Dropdown);

export const sxConfigs = {
  button: {
    width: "fit-content",
    textTransform: "initial",
    color: ({ palette }: { palette: Palette }) => palette.text.primary,
  },
  menu: {
    [`& .${menuClasses.paper}`]: {
      backgroundImage: "none",
      backgroundColor: "#000",
    },
  },
  menuItem: {
    cursor: "pointer",
    py: 1.5,
    [`&.${menuItemClasses.focusVisible}`]: {
      backgroundColor: ({ palette }: { palette: Palette }) =>
        palette.action.hover,
    },
  },
  menuItemLabel: {},
};

const BUTTON_MENU_ID = "button__Menu";
const MENU_ID = "menu__";

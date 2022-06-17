import React, { memo, useState, MouseEvent, useMemo } from "react";
import {
  Button,
  ButtonProps,
  Menu,
  MenuItem,
  menuItemClasses,
  MenuProps,
  Palette,
  Stack,
  MenuItemProps,
} from "@mui/material";
import Text, { TextProps } from "./Text";
import { CaretIcon } from "icons";
import { Option } from "constant/types";
import IconButton, { IconButtonProps } from "./IconButton";

export enum DropdownButtonType {
  BUTTON = 1,
  ICON_BUTTON,
}

type DropdownProps = {
  label?: string;
  onChange: (option: Option) => void;
  options: Option[];
  buttonProps?: ButtonProps | IconButtonProps;
  labelProps?: TextProps;
  menuProps?: Omit<MenuProps, "open">;
  menuItemProps?: MenuItemProps;
  value?: string | number;
  type: DropdownButtonType;
};

const Dropdown = (props: DropdownProps) => {
  const {
    label,
    onChange,
    options,
    buttonProps = {},
    labelProps = {},
    menuProps = {},
    menuItemProps = {},
    value,
    type = DropdownButtonType.BUTTON,
    ...rest
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const optionSelected = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

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
      {type === DropdownButtonType.BUTTON ? (
        <Button
          id={BUTTON_MENU_ID}
          sx={sxConfigs.button}
          variant="text"
          disableRipple
          endIcon={<CaretIcon sx={{ fontSize: "1em!important" }} />}
          onClick={onOpenDropdown}
          {...(buttonProps as ButtonProps)}
        >
          <Text {...labelProps}>{optionSelected?.label ?? label}</Text>
        </Button>
      ) : (
        <IconButton
          onClick={onOpenDropdown}
          {...(buttonProps as IconButtonProps)}
        >
          {buttonProps.children}
        </IconButton>
      )}

      <Menu
        MenuListProps={{
          "aria-labelledby": BUTTON_MENU_ID,
        }}
        id={MENU_ID}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        sx={sxConfigs.menu}
        {...menuProps}
      >
        {options.map((option) => (
          <MenuItem
            sx={sxConfigs.menuItem}
            key={option.value}
            onClick={onChangeOption(option)}
            {...menuItemProps}
          >
            {option?.icon}
            <Text
              ml={option?.icon ? 1 : 0}
              variant="body2"
              color="text.primary"
            >
              {option.label}
            </Text>
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
  menu: {},
  menuItem: {
    cursor: "pointer",
    [`&.${menuItemClasses.focusVisible}`]: {
      backgroundColor: ({ palette }: { palette: Palette }) =>
        palette.action.hover,
    },
  },
};

const BUTTON_MENU_ID = "button__Menu";
const MENU_ID = "menu__";

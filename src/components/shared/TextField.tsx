import React, { memo, useState, useEffect } from "react";
import {
  TextField as MuiTextField,
  BaseTextFieldProps,
  InputBaseProps,
  styled,
} from "@mui/material";

export type TextFieldProps = BaseTextFieldProps & {
  InputProps?: InputBaseProps;
  clearForm?: boolean;
  onChangeText?: (text: string) => void;
};

const defaultTextFieldProps = {
  fullWidth: true,
  maxRows: 5,
  minRows: 2,
  defaultValue: "",
  clearForm: false,
};

const TextField = (props: TextFieldProps) => {
  const {
    placeholder = props?.multiline ? "Jot something down..." : "Message...",
    defaultValue,
    InputProps,
    clearForm,
    onChangeText,
    ...rest
  } = props;

  const [text, setText] = useState<string>(defaultValue as string);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = event.target.value;
    setText(textValue);
    onChangeText && onChangeText(textValue);
  };

  useEffect(() => {
    if (clearForm) {
      setText("");
    }
  }, [clearForm]);

  return (
    <TextFieldStyled
      placeholder={placeholder}
      value={text}
      InputProps={{
        onChange,
        ...InputProps,
      }}
      {...rest}
    />
  );
};

export default memo(TextField);

TextField.defaultProps = defaultTextFieldProps as Partial<TextFieldProps>;

const TextFieldStyled = styled(MuiTextField)(({ multiline }) => ({
  "& .MuiInputBase-root": {
    height: !multiline && 40,
    "& input, & textarea": {
      fontSize: 15,
    },
    "&.MuiInputBase-sizeSmall": {
      height: !multiline && 36,
      "& input, & textarea": {
        fontSize: 14,
      },
    },
    "&.Mui-focused fieldset, &:hover fieldset": {
      borderWidth: 1,
    },
    "input:autofill": {
      boxShadow: "none",
      backgroundColor: "transparent",
      WebkitTextFillColor: "unset",
      height: "100%",
      boxSizing: "border-box",
    },
  },
}));

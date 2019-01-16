import React, { SFC } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
  secureTextEntry?: boolean;
}

const AuthInput: SFC<Props> = ({
  label,
  value,
  onChange,
  icon,
  secureTextEntry = false
}) => {
  return (
    <div className="authinput">
      <img src={icon} className="authinput-img" />
      <input
        className={"authinput-input"}
        type={secureTextEntry ? "password" : "text"}
        value={value}
        onChange={onChange}
        placeholder={label}
        // style={{ textIndent: "36px" }}
      />
    </div>
  );
};

export { AuthInput };

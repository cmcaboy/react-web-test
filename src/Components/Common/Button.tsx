import React, { SFC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

const Button: SFC<Props> = ({ children }) => {
  return <button>{children}</button>;
};

export { Button };

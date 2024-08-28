import "@sync-workspace/sync-ui/lib/spacing.css";
import React from "react";

interface ButtonProps {
  title: string;
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick, title }: ButtonProps) => {
  return (
    <button className="btn btn-primary" title={title} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

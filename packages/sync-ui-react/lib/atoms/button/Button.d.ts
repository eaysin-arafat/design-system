import "@sync-workspace/sync-ui/lib/button.css";
import React from "react";
interface ButtonProps {
    title: string;
    children: React.ReactNode;
    onClick: () => void;
}
declare const Button: ({ children, onClick, title }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default Button;

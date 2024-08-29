import "@sync-workspace/sync-ui/lib/select.css";
import React from "react";
interface SelectOption {
    label: string;
    value: string;
}
interface OverrideProps {
    key?: string | number;
    className?: string;
    onClick?: () => void;
}
interface RenderOptionProps {
    option: SelectOption;
    isSelected: boolean;
    getOptionRecommendedProps: (overrideProps?: OverrideProps) => Object;
}
interface SelectProps {
    label?: string;
    options?: Array<SelectOption>;
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
    renderOption?: (props: RenderOptionProps) => React.ReactNode;
}
declare const Select: ({ label, options, onOptionSelected, renderOption, }: SelectProps) => import("react/jsx-runtime").JSX.Element;
export default Select;

import "@sync-workspace/sync-ui/lib/select.css";
interface SelectOption {
    label: string;
    value: string;
}
interface SelectProps {
    label?: string;
    options?: Array<SelectOption>;
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
}
declare const Select: ({ label, options, onOptionSelected, }: SelectProps) => import("react/jsx-runtime").JSX.Element;
export default Select;

import "@sync-workspace/sync-ui/lib/select.css";
import { useLayoutEffect, useRef, useState } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options?: Array<SelectOption>;
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
}

const Select = ({
  label = "Please select an option",
  options = [],
  onOptionSelected,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [overlayTop, setOverlayTop] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const labelRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  const handleClick = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: SelectOption, index: number) => {
    if (onOptionSelected) onOptionSelected(option, index);
    setSelectedIndex(index);
    setIsOpen(false);
  };

  return (
    <div className="su-select">
      <button ref={labelRef} className="su-select__label" onClick={handleClick}>
        <span>{label}</span>
        <span>^</span>
      </button>
      {isOpen && (
        <ul className="su-select__overlay" style={{ top: overlayTop }}>
          {options?.map((option, index) => {
            const isSelected = selectedIndex === index;

            return (
              <li
                key={option.value}
                className={`su-select__option ${
                  isSelected ? "su-select__option--selected" : ""
                }`}
                onClick={() => {
                  handleOptionClick(option, index);
                }}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;

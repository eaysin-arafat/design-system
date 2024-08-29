import "@sync-workspace/sync-ui/lib/select.css";
import React, {
  KeyboardEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const KEY_CODES = {
  ENTER: 13,
  SPACE: 32,
  DOWN_ARROW: 40,
  UP_ARROW: 38,
  ESC: 27,
};

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

const getNextOptionIndex = (
  currentIndex: number | null,
  options: Array<SelectOption>
) => {
  if (currentIndex === null) return 0;
  if (currentIndex === options?.length - 1) return 0;

  return currentIndex + 1;
};

const getPreviousOptionIndex = (
  currentIndex: number | null,
  options: Array<SelectOption>
) => {
  if (currentIndex === null) return 0;
  if (currentIndex === 0) return options?.length - 1;

  return currentIndex - 1;
};

const Select = ({
  label = "Please select an option",
  options = [],
  onOptionSelected,
  renderOption,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [overlayTop, setOverlayTop] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [optionRefs, setOptionRefs] =
    useState<React.RefObject<HTMLLIElement>[]>();

  const labelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOptionRefs(options.map((_) => React.createRef<HTMLLIElement>()));
  }, [options.length]);

  useLayoutEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  useLayoutEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs?.[highlightedIndex];
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen, highlightedIndex]);

  const handleClick = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: SelectOption, index: number) => {
    if (onOptionSelected) onOptionSelected(option, index);
    setSelectedIndex(index);
    setIsOpen(false);
  };

  const onButtonKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault();
    if (
      [KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(
        event.keyCode
      )
    ) {
      setIsOpen(true);
      highlightItem(0);
    }
  };

  const onOptionKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault();
    // handle escape key press
    if (event.keyCode === KEY_CODES.ESC) {
      setIsOpen(false);
      return;
    }

    // handle down arrow key press
    if (event.keyCode === KEY_CODES.DOWN_ARROW) {
      highlightItem(getNextOptionIndex(highlightedIndex, options));
    }
    // handle up arrow key press
    if (event.keyCode === KEY_CODES.UP_ARROW) {
      highlightItem(getPreviousOptionIndex(highlightedIndex, options));
    }

    // handle enter key press
    if (event.keyCode === KEY_CODES.ENTER) {
      handleOptionClick(options?.[highlightedIndex!], highlightedIndex!);
    }
  };

  const highlightItem = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  };

  return (
    <div className="su-select">
      <button
        ref={labelRef}
        className="su-select__label"
        onClick={handleClick}
        onKeyDown={onButtonKeyDown}
        area-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        aria-controls="su-select-list"
      >
        <span>{label}</span>
        <span>^</span>
      </button>
      {isOpen && (
        <ul
          className="su-select__overlay"
          style={{ top: overlayTop }}
          role="menu"
          id="su-select-list"
        >
          {options?.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isHighlighted = highlightedIndex === index;

            const ref = optionRefs?.[index];

            const renderOptionProps: RenderOptionProps = {
              option,
              isSelected,
              getOptionRecommendedProps: (
                overrideProps: OverrideProps = {}
              ) => ({
                // here we will define default props
                ref,
                key: option.value,
                className: `su-select__option
                  ${isSelected ? "su-select__option--selected" : ""}
                  ${isHighlighted ? "su-select__option--highlighted" : ""}`,
                role: "menuitemradio",
                "aria-checked": isSelected ? true : undefined,
                "aria-label": option.label,
                tabIndex: isHighlighted ? -1 : 0,
                onClick: () => {
                  handleOptionClick(option, index);
                },
                onMouseEnter: () => highlightItem(index),
                onMouseLeave: () => highlightItem(null),
                onKeyDown: onOptionKeyDown,
                // here will spread override props (user given props)
                ...overrideProps,
              }),
            };

            if (renderOption) return renderOption(renderOptionProps);

            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
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

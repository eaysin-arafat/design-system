import { jsxs, jsx } from 'react/jsx-runtime';
import '@sync-workspace/sync-ui/lib/select.css';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

const KEY_CODES = {
    ENTER: 13,
    SPACE: 32,
    DOWN_ARROW: 40,
    UP_ARROW: 38,
    ESC: 27,
};
const getNextOptionIndex = (currentIndex, options) => {
    if (currentIndex === null)
        return 0;
    if (currentIndex === options?.length - 1)
        return 0;
    return currentIndex + 1;
};
const getPreviousOptionIndex = (currentIndex, options) => {
    if (currentIndex === null)
        return 0;
    if (currentIndex === 0)
        return options?.length - 1;
    return currentIndex - 1;
};
const Select = ({ label = "Please select an option", options = [], onOptionSelected, renderOption, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [overlayTop, setOverlayTop] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [optionRefs, setOptionRefs] = useState();
    const labelRef = useRef(null);
    useEffect(() => {
        setOptionRefs(options.map((_) => React.createRef()));
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
    const handleOptionClick = (option, index) => {
        if (onOptionSelected)
            onOptionSelected(option, index);
        setSelectedIndex(index);
        setIsOpen(false);
    };
    const onButtonKeyDown = (event) => {
        event.preventDefault();
        if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.keyCode)) {
            setIsOpen(true);
            highlightItem(0);
        }
    };
    const onOptionKeyDown = (event) => {
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
            handleOptionClick(options?.[highlightedIndex], highlightedIndex);
        }
    };
    const highlightItem = (optionIndex) => {
        setHighlightedIndex(optionIndex);
    };
    return (jsxs("div", { className: "su-select", children: [jsxs("button", { ref: labelRef, className: "su-select__label", onClick: handleClick, onKeyDown: onButtonKeyDown, "area-haspopup": true, "aria-expanded": isOpen ? true : undefined, "aria-controls": "su-select-list", children: [jsx("span", { children: label }), jsx("span", { children: "^" })] }), isOpen && (jsx("ul", { className: "su-select__overlay", style: { top: overlayTop }, role: "menu", id: "su-select-list", children: options?.map((option, index) => {
                    const isSelected = selectedIndex === index;
                    const isHighlighted = highlightedIndex === index;
                    const ref = optionRefs?.[index];
                    const renderOptionProps = {
                        option,
                        isSelected,
                        getOptionRecommendedProps: (overrideProps = {}) => ({
                            // here we will define default props
                            ref,
                            key: option.value,
                            className: `su-select__option
                  ${isSelected ? "su-select__option--selected" : ""}
                  ${isHighlighted ? "su-select__option--highlighted" : ""}`,
                            role: "menuitem",
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
                    if (renderOption)
                        return renderOption(renderOptionProps);
                    return (jsx("li", { ...renderOptionProps.getOptionRecommendedProps(), children: option.label }));
                }) }))] }));
};

export { Select as default };
//# sourceMappingURL=select.js.map

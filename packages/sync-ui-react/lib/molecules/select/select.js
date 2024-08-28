import { jsxs, jsx } from 'react/jsx-runtime';
import '@sync-workspace/sync-ui/lib/select.css';
import { useState, useRef, useLayoutEffect } from 'react';

const Select = ({ label = "Please select an option", options = [], onOptionSelected, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [overlayTop, setOverlayTop] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const labelRef = useRef(null);
    useLayoutEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
    }, [labelRef.current?.offsetHeight]);
    const handleClick = () => setIsOpen(!isOpen);
    const handleOptionClick = (option, index) => {
        if (onOptionSelected)
            onOptionSelected(option, index);
        setSelectedIndex(index);
        setIsOpen(false);
    };
    return (jsxs("div", { className: "su-select", children: [jsxs("button", { ref: labelRef, className: "su-select__label", onClick: handleClick, children: [jsx("span", { children: label }), jsx("span", { children: "^" })] }), isOpen && (jsx("ul", { className: "su-select__overlay", style: { top: overlayTop }, children: options?.map((option, index) => {
                    const isSelected = selectedIndex === index;
                    return (jsx("li", { className: `su-select__option ${isSelected ? "su-select__option--selected" : ""}`, onClick: () => {
                            handleOptionClick(option, index);
                        }, children: option.label }, option.value));
                }) }))] }));
};

export { Select as default };
//# sourceMappingURL=select.js.map

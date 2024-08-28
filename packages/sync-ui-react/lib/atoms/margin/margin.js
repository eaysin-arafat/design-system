import { jsx } from 'react/jsx-runtime';
import '@sync-workspace/sync-ui/lib/margin.css';

const Margin = ({ space = "md", children, bottom, left, right, top, }) => {
    let className = "";
    if (!left && !right && !top && !bottom)
        className += `su-margin-${space} `;
    if (left)
        className += `su-margin-left-${space} `;
    if (right)
        className += `su-margin-right-${space} `;
    if (top)
        className += `su-margin-top-${space} `;
    if (bottom)
        className += `su-margin-bottom-${space} `;
    return jsx("div", { className: className, children: children });
};

export { Margin as default };
//# sourceMappingURL=margin.js.map

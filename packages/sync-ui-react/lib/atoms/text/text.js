import { jsx } from 'react/jsx-runtime';
import '@sync-workspace/sync-ui/lib/text.css';

const Text = ({ size = "base", children }) => {
    const className = `su-text su-text-${size}`;
    return jsx("p", { className: className, children: children });
};

export { Text as default };
//# sourceMappingURL=text.js.map

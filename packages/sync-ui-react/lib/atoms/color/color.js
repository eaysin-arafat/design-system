import { jsx } from 'react/jsx-runtime';
import '@sync-workspace/sync-ui/lib/spacing.css';

const Color = ({ hexCode, height = "sm", width = "sm" }) => {
    const className = `su-width-${width} su-height-${height}`;
    return (jsx("div", { className: className, style: { backgroundColor: hexCode, height, width } }));
};

export { Color as default };
//# sourceMappingURL=color.js.map

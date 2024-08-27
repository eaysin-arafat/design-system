import { jsx } from 'react/jsx-runtime';
import '@sync-workspace/sync-ui/lib/button.css';

const Button = ({ children, onClick, title }) => {
    return (jsx("button", { className: "btn btn-primary", title: title, onClick: onClick, children: children }));
};

export { Button as default };
//# sourceMappingURL=Button.js.map

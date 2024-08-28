import { spacing } from "@sync-workspace/foundation";
import "@sync-workspace/sync-ui/lib/margin.css";

interface MarginProps {
  space?: keyof typeof spacing;
  children: React.ReactNode;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

const Margin = ({
  space = "md",
  children,
  bottom,
  left,
  right,
  top,
}: MarginProps) => {
  let className = "";

  if (!left && !right && !top && !bottom) className += `su-margin-${space} `;
  if (left) className += `su-margin-left-${space} `;
  if (right) className += `su-margin-right-${space} `;
  if (top) className += `su-margin-top-${space} `;
  if (bottom) className += `su-margin-bottom-${space} `;

  return <div className={className}>{children}</div>;
};

export default Margin;

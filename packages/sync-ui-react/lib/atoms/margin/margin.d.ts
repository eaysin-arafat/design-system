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
declare const Margin: ({ space, children, bottom, left, right, top, }: MarginProps) => import("react/jsx-runtime").JSX.Element;
export default Margin;

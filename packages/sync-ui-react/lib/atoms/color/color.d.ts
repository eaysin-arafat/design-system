import { spacing } from "@sync-workspace/foundation/lib/index";
import "@sync-workspace/sync-ui/lib/spacing.css";
interface ColorProps {
    hexCode: string;
    width?: keyof typeof spacing;
    height?: keyof typeof spacing;
}
declare const Color: ({ hexCode, height, width }: ColorProps) => import("react/jsx-runtime").JSX.Element;
export default Color;

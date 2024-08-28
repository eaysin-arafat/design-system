import { fontSize } from "@sync-workspace/foundation/lib";
import "@sync-workspace/sync-ui/lib/text.css";
interface TextProps {
    size?: keyof typeof fontSize;
    children: React.ReactNode;
}
declare const Text: ({ size, children }: TextProps) => import("react/jsx-runtime").JSX.Element;
export default Text;

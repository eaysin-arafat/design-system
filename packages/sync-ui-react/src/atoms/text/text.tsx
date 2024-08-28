import { fontSize } from "@sync-workspace/foundation/lib";
import "@sync-workspace/sync-ui/lib/text.css";

interface TextProps {
  size?: keyof typeof fontSize;
  children: React.ReactNode;
}

const Text = ({ size = "base", children }: TextProps) => {
  const className = `su-text su-text-${size}`;

  return <p className={className}>{children}</p>;
};

export default Text;

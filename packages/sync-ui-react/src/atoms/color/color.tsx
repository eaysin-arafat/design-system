import { spacing } from "@sync-workspace/foundation/lib/index";
import "@sync-workspace/sync-ui/lib/spacing.css";

interface ColorProps {
  hexCode: string;
  width?: keyof typeof spacing;
  height?: keyof typeof spacing;
}

const Color = ({ hexCode, height = "sm", width = "sm" }: ColorProps) => {
  const className = `su-width-${width} su-height-${height}`;

  return (
    <div
      className={className}
      style={{ backgroundColor: hexCode, height, width }}
    ></div>
  );
};

export default Color;

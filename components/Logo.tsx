// components/Logo.js
import { cn } from "@/lib/utils";
import React from "react";
interface LogoProps {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number;
  color?: string;
  text?: string;
  className?: string;
}
const Logo = ({
  svg: Svg,
  size = 50,
  color = "#000",
  text = "StaySync",
  className,
}: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Svg width={size} height={size} fill={color} />
      <span className={`text-${color} text-lg font-bold`}>{text}</span>
    </div>
  );
};

export default Logo;

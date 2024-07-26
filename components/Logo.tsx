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

  text = "StaySync",
  className,
}: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-4 border", className)}>
      <Svg width={size} height={size} className="" />
      <span className=" text-2xl font-semibold">{text}</span>
    </div>
  );
};

export default Logo;

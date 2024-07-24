"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface HeaderProps {
  className?: string;
}

function Header({ className }: HeaderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className={`relative flex items-center justify-end ${className}`}>
      <div className="flex items-center justify-center">
        <Button variant="ghost">
          <IconSearch size={20} />
        </Button>
        <Button variant="ghost">
          <IconBell size={20} />
        </Button>
      </div>
    </header>
  );
}

export default Header;

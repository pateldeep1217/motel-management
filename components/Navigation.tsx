"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Button } from "./ui/button";

function Navigation() {
  const [isOpen, setIsOpen] = useState();
  return (
    <div>
      <Button variant="ghost">
        <Bars3Icon className="w-6 h-6 cursor-pointer" />
      </Button>
    </div>
  );
}

export default Navigation;

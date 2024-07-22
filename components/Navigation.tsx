"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogPanel } from "@headlessui/react";
import NavigationLinks from "./NavigationLinks";
import Logo from "./Logo";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
import LogoSVG from "./LogoSVG";
interface NavigationProps {
  className?: string;
}
const sidebarVariants = {
  open: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  closed: { x: "-100%", opacity: 0, transition: { duration: 0.9 } },
};

function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AnimatePresence>
      <nav className={`relative flex items-center md:static  ${className}`}>
        <Button
          variant="ghost"
          className="md:hidden "
          onClick={() => setIsOpen(true)}
        >
          <Bars3Icon className="w-6 h-6 cursor-pointer" />
        </Button>

        <div className="hidden md:flex  md:flex-col h-screen  w-full border-r shadow-xl">
          <Logo svg={LogoSVG} className=" border-b p-6" />
          <NavigationLinks />
        </div>

        {isOpen && (
          <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className={`fixed inset-0   z-50`}>
              <motion.div
                className=" h-full max-w-xs bg-card text-card-foreground p-4 space-y-4 border-r shadow-2xl"
                initial="closed"
                animate={isOpen ? "open" : "close"}
                exit="closed"
                variants={sidebarVariants}
              >
                <DialogPanel className="flex flex-col   ">
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    className="max-w-fit  "
                  >
                    <XMarkIcon className="w-6 h-6 cursor-pointer" />
                  </Button>
                  <div className="flex flex-col gap-6">
                    <Logo svg={LogoSVG} />
                    <NavigationLinks />
                  </div>
                </DialogPanel>
              </motion.div>
            </div>
          </Dialog>
        )}
      </nav>
    </AnimatePresence>
  );
}

export default Navigation;

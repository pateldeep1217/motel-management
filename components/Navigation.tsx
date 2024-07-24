"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogPanel } from "@headlessui/react";
import NavigationLinks from "./NavigationLinks";
import Logo from "./Logo";
import { AnimatePresence, motion } from "framer-motion";
import LogoSVG from "./LogoSVG";
import { IconMenu3, IconX } from "@tabler/icons-react";

interface NavigationProps {
  className?: string;
}

const backdropVariants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const sidebarVariants = {
  closed: {
    x: "-100%", // Sidebar off-screen to the left
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 12,
    },
  },
  open: {
    x: 0, // Sidebar in its original position
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 18,
    },
  },
};

function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  // Function to check the viewport size
  const checkViewport = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    // Initial check
    checkViewport();
    // Add event listener
    window.addEventListener("resize", checkViewport);
    // Cleanup event listener
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    // Set initial render to false after the first render
    setInitialRender(false);
  }, []);

  return (
    <nav className={`relative flex items-center ${className}`}>
      <Button
        variant="ghost"
        className="md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <IconMenu3 size={20} />
      </Button>
      {/* Desktop Navigation */}
      <motion.div
        className="hidden md:flex md:flex-col h-screen w-full border-r shadow-xl glass-sidebar"
        initial={{ x: initialRender ? 0 : "-100%" }}
        animate={{ x: isMobile ? "-100%" : "0" }}
        transition={{ duration: 0.5, type: "spring", damping: 12 }}
      >
        <Logo svg={LogoSVG} className="p-6" />
        <NavigationLinks />
      </motion.div>
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
              <motion.div
                className="fixed top-0 left-0 h-full max-w-xs bg-card text-card-foreground shadow-2xl z-50"
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit="closed"
                variants={sidebarVariants}
              >
                <DialogPanel className="flex flex-col ">
                  <div className="flex justify-between items-center p-4">
                    <Logo svg={LogoSVG} className="p-6" />
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      className="max-w-fit"
                    >
                      <IconX size={20} />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-6">
                    <NavigationLinks />
                  </div>
                </DialogPanel>
              </motion.div>
            </Dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navigation;

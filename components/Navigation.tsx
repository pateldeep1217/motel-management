"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogPanel } from "@headlessui/react";
import NavigationLinks from "./NavigationLinks";
import Logo from "./Logo";
import HotelSVG from "./HotelSVG";
interface NavigationProps {
  className?: string;
}

function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <nav className={`relative flex items-center md:static ${className}`}>
      <Button
        variant="ghost"
        className="md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Bars3Icon className="w-6 h-6 cursor-pointer" />
      </Button>

      <div className="hidden md:flex  md:flex-col gap-4 bg-card text-card-foreground h-screen  w-full ">
        <Logo svg={HotelSVG} className="mr-4 p-4" />
        <NavigationLinks />
      </div>

      {isOpen && (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
            <div className=" h-full max-w-xs bg-card text-card-foreground p-4 space-y-4 ">
              <DialogPanel className="flex flex-col gap-2  ">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  className="max-w-fit "
                >
                  <XMarkIcon className="w-6 h-6 cursor-pointer" />
                </Button>
                <Logo svg={HotelSVG} className="pt-10 pb-5 " />
                <NavigationLinks />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </nav>
  );
}

export default Navigation;

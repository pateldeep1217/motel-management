import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";

import { Button } from "./ui/button";

interface HeaderProps {
  className?: string;
}

function Header({ className }: HeaderProps) {
  return (
    <header className={`flex items-center justify-end  ${className}`}>
      <div>
        <Button variant="ghost">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost">
          <BellIcon className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}

export default Header;

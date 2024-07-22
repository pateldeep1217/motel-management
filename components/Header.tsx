import { Button } from "./ui/button";
import { IconBell, IconSearch } from "@tabler/icons-react";

interface HeaderProps {
  className?: string;
}

function Header({ className }: HeaderProps) {
  return (
    <header className={`flex items-center justify-end  ${className}`}>
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

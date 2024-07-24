import Link from "next/link";
import React from "react";

import { usePathname } from "next/navigation";
import { navigationLinks } from "@/lib/navigationLinks";

function NavigationLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-2 w-full mt-4">
      {navigationLinks.map(({ href, label, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={label} className="w-full">
            <Link
              href={href}
              className={`flex items-center gap-2 py-2 px-6  rounded hover:bg-muted ${
                isActive ? "bg-muted" : ""
              } `}
            >
              {icon}
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavigationLinks;

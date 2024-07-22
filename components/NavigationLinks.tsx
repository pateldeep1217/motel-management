import Link from "next/link";
import React from "react";

import {
  BuildingOfficeIcon,
  CogIcon,
  CalendarIcon,
  ChartBarSquareIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
interface LinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navigationLinks = [
  {
    href: "/",
    label: "Dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
    active: true,
  },
  {
    href: "/rooms",
    label: "Rooms",
    icon: <BuildingOfficeIcon className="h-5 w-5" />,
  },
  {
    href: "/reservations",
    label: "Reservations",
    icon: <CalendarIcon className="h-5 w-5" />,
  },
  {
    href: "/customers",
    label: "Customers",
    icon: <UserIcon className="h-5 w-5" />,
  },
  {
    href: "/reports",
    label: "Reports",
    icon: <ChartBarSquareIcon className="h-5 w-5" />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <CogIcon className="h-5 w-5" />,
  },
];
function NavigationLinks() {
  return (
    <ul className="flex flex-col gap-2 w-full px-4">
      {navigationLinks.map(({ href, label, icon }) => (
        <li key={label} className="w-full ">
          <Link
            href={href}
            className="flex items-center gap-2 p-2 rounded hover:bg-muted"
          >
            {icon}
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavigationLinks;

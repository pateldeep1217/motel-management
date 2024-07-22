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
    icon: <HomeIcon className="h-6 w-6" />,
    active: true,
  },
  {
    href: "/rooms",
    label: "Rooms",
    icon: <BuildingOfficeIcon className="h-6 w-6" />,
  },
  {
    href: "/reservations",
    label: "Reservations",
    icon: <CalendarIcon className="h-6 w-6" />,
  },
  {
    href: "/customers",
    label: "Customers",
    icon: <UserIcon className="h-6 w-6" />,
  },
  {
    href: "/reports",
    label: "Reports",
    icon: <ChartBarSquareIcon className="h-6 w-6" />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <CogIcon className="h-6 w-6" />,
  },
];
function NavigationLinks() {
  return (
    <ul className="flex flex-col gap-2">
      {navigationLinks.map(({ href, label, icon }) => (
        <li key={label}>
          <Link
            href={href}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
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

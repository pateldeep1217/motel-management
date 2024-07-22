import Link from "next/link";
import React from "react";
import {
  IconBuilding,
  IconSettings,
  IconCalendar,
  IconChartBar,
  IconHome,
  IconUser,
} from "@tabler/icons-react";

interface LinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navigationLinks = [
  {
    href: "/",
    label: "Dashboard",
    icon: <IconHome size={20} />,
    active: true,
  },
  {
    href: "/rooms",
    label: "Rooms",
    icon: <IconBuilding size={20} />,
  },
  {
    href: "/reservations",
    label: "Reservations",
    icon: <IconCalendar size={20} />,
  },
  {
    href: "/customers",
    label: "Customers",
    icon: <IconUser size={20} />,
  },
  {
    href: "/reports",
    label: "Reports",
    icon: <IconChartBar size={20} />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <IconSettings size={20} />,
  },
];

function NavigationLinks() {
  return (
    <ul className="flex flex-col gap-2 w-full">
      {navigationLinks.map(({ href, label, icon }) => (
        <li key={label} className="w-full">
          <Link
            href={href}
            className="flex items-center gap-2 p-4 rounded hover:bg-muted"
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

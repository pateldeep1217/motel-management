// lib/navigationLinks.ts
import {
  IconBuilding,
  IconSettings,
  IconCalendar,
  IconChartBar,
  IconHome,
  IconUser,
} from "@tabler/icons-react";

export const navigationLinks = [
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

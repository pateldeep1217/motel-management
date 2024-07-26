"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/lib/navigationLinks";
function BreadCrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const getLabelFromHref = (href: string) => {
    const link = navigationLinks.find((link) => link.href === href);
    return link ? link.label : "Unknown";
  };

  const isHomeOrDashboard = (href: string) =>
    href === "/" || href === "/dashboard";

  return (
    <Breadcrumb className="ml-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className={pathname === "/" ? "text-white" : "text-gray-500"}
          >
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          console.log(segment);
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{getLabelFromHref(href)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={href}
                    className={
                      pathname === href ? "text-white" : "text-gray-500"
                    }
                  >
                    {getLabelFromHref(href)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumb;

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { NAVITEMS, PRODUCTS_NAVITEMS } from "@/lib/constants/nav";
import { Button } from "./button";

import type { NavItem } from "@/lib/models";
import Clock from "./clock";
import SyncNotification from "@/core/sync-remote/presentation/components/sync-notification";

interface Props {
  variant?: "primary" | "products";
}

interface NavItemState extends NavItem {
  current?: boolean;
}

const NavBar = ({ variant = "primary" }: Props) => {
  const pathname = usePathname();
  const [navItems, setNavItems] = useState<NavItemState[]>(NAVITEMS);

  useEffect(() => {
    let newNavItems: NavItemState[] = [];

    switch (variant) {
      case "primary":
        newNavItems = NAVITEMS.map((item) => ({
          ...item,
          current: item.href.includes(pathname),
        }));
        break;
      case "products":
        newNavItems = PRODUCTS_NAVITEMS.map((item) => ({
          ...item,
          current: item.href === pathname,
        }));
        break;
      default:
        newNavItems = [];
        break;
    }

    setNavItems(newNavItems);
  }, [pathname]);

  return (
    <nav className="py-4 flex px-10 z-50 bg-lightbg-200 fixed h-32 top-0 w-full justify-between shadow-md">
      <div className="flex justify-between flex-col gap-y-5">
        <h1 className="text-3xl font-bold text-lighttext-100">
          Tienda Andres - Web App
        </h1>
        <ul className="flex gap-5">
          {navItems.map(({ name, href, icon: Icon, current }) => (
            <li key={href}>
              <Button
                variant="outline"
                className={cn("gap-2", {
                  "border-black": current,
                })}
                asChild
              >
                <Link href={href}>
                  <span>
                    <Icon size={20} />
                  </span>
                  {name}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between flex-col">
        <Clock />
        <SyncNotification />
      </div>
    </nav>
  );
};

export default NavBar;

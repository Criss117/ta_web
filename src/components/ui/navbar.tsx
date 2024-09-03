"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { NAVITEMS, PRODUCTS_NAVITEMS } from "@/lib/constants/nav";
import { Button } from "./button";

import type { NavItem } from "@/lib/models";
import { useEffect, useState } from "react";

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
    <nav className="flex items-center px-10 z-50 bg-lightbg-200 fixed top-0 w-full h-20">
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
    </nav>
  );
};

export default NavBar;

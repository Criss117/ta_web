import {
  BadgeDollarSign,
  Bolt,
  FilePenLine,
  FilePlus2,
  PackageSearch,
  TableCellsMerge,
  Trash2,
  Users,
} from "lucide-react";
import { NavItem } from "../models";

export const ROUTES = {
  TICKETS: "/tickets",
  SALES: "/sales",
  CLIENT: "/clients",
  CLIENTS: "/clients?page=1&offset=10",
  PRODUCTS: "/products?page=1&offset=10",
  INVENTORY: "/inventory",
  CONFIG: "/config",
  CREATE_PRODUCTS: "/products/create",
  EDIT_PRODUCTS: "/products/edit",
  DELETE_PRODUCTS: "/products/delete",
  EDIT_CLIENTS: "/clients/edit",
  CREATE_CLIENTS: "/clients/create",
  BALANCE_REPORT: "/clients/balance-report",
} as const;

export const NAVITEMS: NavItem[] = [
  {
    name: "Ventas",
    href: ROUTES.TICKETS,
    icon: BadgeDollarSign,
  },
  {
    name: "Clientes",
    href: ROUTES.CLIENTS,
    icon: Users,
  },
  {
    name: "Productos",
    href: ROUTES.PRODUCTS,
    icon: PackageSearch,
  },
  {
    name: "Configuración",
    href: ROUTES.CONFIG,
    icon: Bolt,
  },
];

export const PRODUCTS_NAVITEMS: NavItem[] = [
  {
    name: "Crear",
    href: ROUTES.CREATE_PRODUCTS,
    icon: FilePlus2,
  },
  {
    name: "Editar",
    href: ROUTES.EDIT_PRODUCTS,
    icon: FilePenLine,
  },
  {
    name: "Eliminar",
    href: ROUTES.DELETE_PRODUCTS,
    icon: Trash2,
  },
];

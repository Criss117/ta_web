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
  SALES: "/sales",
  CLIENTS: "/clients",
  PRODUCTS: "/products",
  INVENTORY: "/inventory",
  CONFIG: "/config",
  CREATE_PRODUCTS: "/products/create",
  EDIT_PRODUCTS: "/products/edit",
  DELETE_PRODUCTS: "/products/delete",
} as const;

export const NAVITEMS: NavItem[] = [
  {
    name: "Ventas",
    href: ROUTES.SALES,
    icon: BadgeDollarSign,
  },
  {
    name: "Clientes",
    href: ROUTES.CLIENTS,
    icon: Users,
  },
  {
    name: "Productos",
    href: ROUTES.CREATE_PRODUCTS,
    icon: PackageSearch,
  },
  {
    name: "Inventario",
    href: ROUTES.INVENTORY,
    icon: TableCellsMerge,
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

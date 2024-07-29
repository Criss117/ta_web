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

export const NAVITEMS: NavItem[] = [
  {
    name: "Ventas",
    href: "/sales",
    icon: BadgeDollarSign,
  },
  {
    name: "Clientes",
    href: "/clients",
    icon: Users,
  },
  {
    name: "Productos",
    href: "/products/create",
    icon: PackageSearch,
  },
  {
    name: "Inventario",
    href: "/inventory",
    icon: TableCellsMerge,
  },
  {
    name: "Configuración",
    href: "/config",
    icon: Bolt,
  },
];

export const PRODUCTS_NAVITEMS: NavItem[] = [
  {
    name: "Crear",
    href: "/products/create",
    icon: FilePlus2,
  },
  {
    name: "Editar",
    href: "/products/edit",
    icon: FilePenLine,
  },
  {
    name: "Eliminar",
    href: "/products/delete",
    icon: Trash2,
  },
];

import { icons } from "~/composables/icons.js";

export const menuItems = [
  { text: "Dashboard", icon: "DashboardIcon", route: "/dashboard" },
  {
    text: "Admin",
    icon: "UsersIcon",
    children: [
      { text: "User", route: "/admin/users" },
      { text: "Role", route: "/admin/roles" },
      { text: "Permission", route: "/admin/permissions" },
    ],
  },
  {
    text: "Master",
    icon: "CubeTransparent",
    children: [
      { text: "Position", route: "/master/positions" },
      {
        text: "Document",
        icon: "Document",
        children: [
          { text: "Category", route: "/master/document/category" },
          { text: "Type", route: "/master/document/type" },
        ],
      },
    ],
  },
  {
    text: "Docs",
    icon: "FolderIcon",
    children: [
      { text: "My Docs", route: "/docs/my-docs" },
      { text: "Shared with me", route: "/docs/shared" },
      { text: "Master", route: "/docs/master" },
    ],
  },
];

import { icons } from "~/composables/icons.js";

export const menuItems = [
  {
    text: "Dashboard",
    icon: "DashboardIcon",
    route: "/dashboard",
    permission: "menu.dashboard",
  },
  {
    text: "Admin",
    icon: "UsersIcon",
    permission: "menu.admin",
    children: [
      { text: "User", route: "/admin/users", permission: "user.view" },
      { text: "Role", route: "/admin/roles", permission: "role.view" },
      {
        text: "Permission",
        route: "/admin/permissions",
        permission: "permission.view",
      },
    ],
  },
  {
    text: "Master",
    icon: "CubeTransparent",
    permission: "menu.master",
    children: [
      {
        text: "Position",
        route: "/master/positions",
        permission: "position.view",
      },
    ],
  },
  {
    text: "Docs",
    icon: "FolderOuterIcon",
    permission: "menu.docs",
    children: [
      { text: "My Docs", route: "/docs/my-docs", permission: "my_doc.view" },
      {
        text: "Shared with me",
        route: "/docs/shared",
        permission: "shared_doc.view",
      },
      { text: "Master", route: "/docs/master", permission: "master_doc.view" },
    ],
  },
];

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/menu",
    component: () => import("layouts/MenuLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/Menu.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
  {
    path: "/registrarse",
    component: () => import("pages/Register.vue"),
  },
];

export default routes;

import { createRouter, createWebHistory } from "vue-router";
import Main from "@/layout/Main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Main,
      children: [
        {
          path: "/workbenches",
          children: [
            {
              path: "/workbenches/hotel",
              name: "workbenches-hotel",
              component: () =>
                import("@/views/workbenches/Hotel.vue").then((m) => m),
            },
            {
              path: "/workbenches/secondary_confirmation",
              name: "workbenches-secondary_confirmation",
              component: () =>
                import("@/views/workbenches/SecondaryConfirmation.vue").then(
                  (m) => m
                ),
            },
            {
              path: "/workbenches/plane_ticket",
              name: "workbenches-plane_ticket",
              component: () =>
                import("@/views/workbenches/PlaneTicket.vue").then((m) => m),
            },
            {
              path: "/workbenches/operation",
              name: "workbenches-operation",
              component: () =>
                import("@/views/workbenches/Operation.vue").then((m) => m),
            },
          ],
        },
        {
          path: "/work_order_center",
          name: "work_order_center",
          component: () => import("@/views/WorkOrderCenter.vue").then((m) => m),
        },
        {
          path: "/staff_management",
          name: "staff_management",
          component: () => import("@/views/StaffManagement.vue").then((m) => m),
        },
        {
          path: "/monitoring_board",
          name: "monitoring_board",
          component: () => import("@/views/MonitoringBoard.vue").then((m) => m),
        },
        {
          path: "/process_configuration",
          name: "process_configuration",
          component: () =>
            import("@/views/ProcessConfiguration.vue").then((m) => m),
        },
        {
          path: "/knowledge_base",
          name: "knowledge_base",
          component: () => import("@/views/KnowledgeBase.vue").then((m) => m),
        },
      ],
    },
  ],
});

export default router;

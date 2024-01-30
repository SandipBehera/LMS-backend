export const EmployeeMenu = [
  {
    menutitle: "General",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        path: `/dashboard`,
        icon: "home",
        title: "Dashboard",
        type: "link",
        badge: "badge badge-light-primary",
        active: false,
      },
      {
        title: "Add Books",
        icon: "widget",
        type: "sub",
        active: false,
        children: [
          { path: `/add-books`, title: "Add Category", type: "link" },
          { path: `/book-location`, title: "Add Location", type: "link" },

          
        ],
      },
    ],
  },
];

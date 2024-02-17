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
        title: "Book Category",
        icon: "widget",
        type: "sub",
        active: false,
        children: [
          { path: `/add-category`, title: "Add Category", type: "link" },
          { path: `/all-category`, title: "All Category", type: "link" },

          
        ],
      },
      {
        title: "Book Location",
        icon: "widget",
        type: "sub",
        active: false,
        children: [
          { path: `/add-book-location`, title: "Add Book Location", type: "link" },
          { path: `/all-book-location`, title: "All Book Location", type: "link" },

          
        ],
      },
      {
        title: "Add Book",
        icon: "widget",
        type: "sub",
        active: false,
        children: [
          { path: `/add-book`, title: "Add Book", type: "link" },
          { path: `/view-books`, title: "All Book", type: "link" },


          
        ],
      },
    ],
  },
];

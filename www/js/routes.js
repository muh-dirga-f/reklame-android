var routes = [
  {
    name: "home",
    path: "/",
    url: "./index.html",
  },
  {
    name: "informasi",
    path: "/informasi/",
    componentUrl: "./pages/informasi.html",
  },
  {
    name: "input-perizinan",
    path: "/input-perizinan/",
    componentUrl: "./pages/input-perizinan.html",
  },
  {
    name: "akun",
    path: "/akun/",
    componentUrl: "./pages/akun.html",
  },
  {
    name: "detail-akun",
    path: "/detail-akun/",
    componentUrl: "./pages/detail-akun.html",
  },
  {
    name: "cek-izin",
    path: "/cek-izin/",
    componentUrl: "./pages/cek-izin.html",
  },
  {
    name: "status-izin",
    path: "/status-izin/:id",
    componentUrl: "./pages/status-izin.html",
  },
  //* Default route (404 page). MUST BE THE LAST
  {
    path: "(.*)",
    url: "./pages/404.html",
  },
];

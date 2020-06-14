import React from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import Loader from "./shared/Loader";
// Layouts
import Layout from "./shared/layouts/Layout";

// Lazy load component
const lazy = (cb) => loadable(() => pMinDelay(cb(), 200), {
  fallback: <Loader />,
});

// ---
// Default application layout

export const DefaultLayout = Layout;

// ---
// Document title template

export const titleTemplate = "%s";

// ---
// Routes
//
// Note: By default all routes use { "exact": true }. To change this
// behaviour, pass "exact" option explicitly to the route object

export const defaultRoute = "/";
export const routes = [
  {
    path: "/",
    component: lazy(() => import("./containers/Dashboard")),
  },
  {
    path: "/logout",
    component: lazy(() => import("./containers/Logout")),
  },
  {
    path: "/tags",
    component: lazy(() => import("./containers/Tags")),
  },
  {
    path: "/tags/add",
    component: lazy(() => import("./containers/Tags/components/TagAdd")),
  },
  {
    path: "/tags/edit/:tagId",
    component: lazy(() => import("./containers/Tags/components/TagEdit")),
  },
  {
    path: "/media",
    component: lazy(() => import("./containers/Media")),
  },
  {
    path: "/report",
    component: lazy(() => import("./containers/Report")),
  },
  {
    path: "/links",
    component: lazy(() => import("./containers/Links")),
  },
];

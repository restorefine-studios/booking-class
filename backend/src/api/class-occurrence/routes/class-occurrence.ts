/**
 * class-occurrence router
 */

import { factories } from "@strapi/strapi";

const defaultRouter = factories.createCoreRouter("api::class-occurrence.class-occurrence");

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = extraRoutes.concat(innerRouter.routes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: "GET",
    path: "/class-occurrences/slug/:slug",
    handler: "class-occurrence.findBySlug",
    config: {
      auth: false,
    },
  },
];

export default customRouter(defaultRouter, myExtraRoutes);

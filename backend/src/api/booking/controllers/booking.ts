/**
 * booking controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::booking.booking", ({ strapi }) => ({
  // Override find method to always populate class details
  async find(ctx) {
    // Merge populate settings with existing query parameters
    const existingPopulate = typeof ctx.query.populate === "object" ? ctx.query.populate : {};
    ctx.query.populate = {
      ...existingPopulate,
      classOccurrence: {
        fields: ["title", "date", "startTime", "endTime", "price", "location", "instructor"],
      },
      user: {
        fields: ["email", "username", "firstName", "lastName"],
      },
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  // Override findOne to populate class details
  async findOne(ctx) {
    // Merge populate settings with existing query parameters
    const existingPopulate = typeof ctx.query.populate === "object" ? ctx.query.populate : {};
    ctx.query.populate = {
      ...existingPopulate,
      classOccurrence: {
        fields: ["title", "date", "startTime", "endTime", "price", "location", "instructor"],
      },
      user: {
        fields: ["email", "username", "firstName", "lastName"],
      },
    };

    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  },

  // Use Strapi's default create method
  async create(ctx) {
    return super.create(ctx);
  },

  // Custom update method
  async update(ctx) {
    console.log("🎯 Booking update called with:", ctx.request.body);
    return super.update(ctx);
  },

  // Add custom action to get booking with full details for admin
  async findWithDetails(ctx) {
    const entity = await strapi.entityService.findMany("api::booking.booking", {
      ...ctx.query,
      populate: ["classOccurrence", "user"],
    });

    return entity;
  },
}));

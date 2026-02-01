module.exports = {
  // Before creating a booking, log the details
  async beforeCreate(event) {
    const { data } = event.params;

    console.log("📝 Creating booking with data:", {
      classOccurrence: data.classOccurrence,
      user: data.user,
      status: data.status,
    });
  },

  // After creating, log confirmation and update available spots
  async afterCreate(event) {
    const { result } = event;
    console.log("✅ Booking created successfully:", {
      id: result.id,
      classOccurrence: result.classOccurrence,
      user: result.user,
      status: result.status,
    });

    // If booking is confirmed, increment the bookedCount for the class
    if (result.status === "confirmed") {
      try {
        const classOccurrence = await strapi.entityService.findOne("api::class-occurrence.class-occurrence", result.classOccurrence);

        if (classOccurrence) {
          const currentBookedCount = classOccurrence.bookedCount || 0;
          await strapi.entityService.update("api::class-occurrence.class-occurrence", result.classOccurrence, {
            data: {
              bookedCount: currentBookedCount + 1,
            },
          });
          console.log(`📊 Updated class ${result.classOccurrence} bookedCount: ${currentBookedCount} -> ${currentBookedCount + 1}`);
        }
      } catch (error) {
        console.error("❌ Failed to update bookedCount:", error);
      }
    }
  },

  // When a booking is updated (e.g., cancelled), adjust the bookedCount
  async afterUpdate(event) {
    const { result, params } = event;
    const previousData = params.data;

    // If status changed from confirmed to cancelled, decrement bookedCount
    if (previousData.status === "cancelled" && result.status === "cancelled") {
      try {
        const classOccurrence = await strapi.entityService.findOne("api::class-occurrence.class-occurrence", result.classOccurrence);

        if (classOccurrence && classOccurrence.bookedCount > 0) {
          await strapi.entityService.update("api::class-occurrence.class-occurrence", result.classOccurrence, {
            data: {
              bookedCount: classOccurrence.bookedCount - 1,
            },
          });
          console.log(`📊 Decremented class ${result.classOccurrence} bookedCount: ${classOccurrence.bookedCount} -> ${classOccurrence.bookedCount - 1}`);
        }
      } catch (error) {
        console.error("❌ Failed to decrement bookedCount:", error);
      }
    }
  },
};

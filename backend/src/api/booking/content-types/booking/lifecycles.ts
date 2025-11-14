export default {
  // Before creating a booking, log the details
  async beforeCreate(event) {
    const { data } = event.params;
    
    console.log('📝 Creating booking with data:', {
      classOccurrence: data.classOccurrence,
      user: data.user,
      status: data.status,
    });
  },
  
  // After creating, log confirmation
  async afterCreate(event) {
    const { result } = event;
    console.log('✅ Booking created successfully:', {
      id: result.id,
      classOccurrence: result.classOccurrence,
      user: result.user,
      status: result.status,
    });
  },
};

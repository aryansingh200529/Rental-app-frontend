const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  price: { type: Number, required: true },
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  propertyType: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  amenities: [{ type: String }],
}, { timestamps: true });

// Create a text index for searching
ListingSchema.index({ 
  'address.street': 'text', 
  'address.city': 'text', 
  description: 'text' 
});

module.exports = mongoose.model('Listing', ListingSchema);
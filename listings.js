const express = require('express');
const {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing
} = require('../controllers/listingController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getAllListings)
  .post(protect, authorize('Landlord'), createListing); // Only landlords can create listings

router.route('/:id')
  .get(getListingById)
  .put(protect, authorize('Landlord'), updateListing) // Only landlords can update
  .delete(protect, authorize('Landlord'), deleteListing); // Only landlords can delete

module.exports = router;
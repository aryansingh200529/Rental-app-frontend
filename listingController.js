const Listing = require('../models/Listing');


exports.getAllListings = async (req, res) => {
  try {
    const { query, minPrice, maxPrice, beds, city, type } = req.query;
    let filter = {};

    if (city) filter['address.city'] = new RegExp(city, 'i');
    if (type) filter.propertyType = new RegExp(type, 'i');
    if (beds) filter.bedrooms = { $gte: Number(beds) };

    const priceFilter = {};
    if (minPrice) priceFilter.$gte = Number(minPrice);
    if (maxPrice) priceFilter.$lte = Number(maxPrice);
    if (Object.keys(priceFilter).length > 0) filter.price = priceFilter;

    if (query) {
        filter.$text = { $search: query };
    }

    const listings = await Listing.find(filter).populate('ownerId', 'email');
    res.status(200).json({ success: true, count: listings.length, data: listings });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('ownerId', 'email');
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    res.status(200).json({ success: true, data: listing });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.createListing = async (req, res) => {
  try {
    req.body.ownerId = req.user.id; 
    const listing = await Listing.create(req.body);
    res.status(201).json({ success: true, data: listing });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.updateListing = async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ success: false, message: 'Listing not found' });
        }

        
        if (listing.ownerId.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to update this listing' });
        }

        listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: listing });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


exports.deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ success: false, message: 'Listing not found' });
        }

        
        if (listing.ownerId.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this listing' });
        }

        await listing.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
import User from "../Models/userModel.js";

export const getCustomers = async (req, res) => {
  const { page = 1, limit = 10, first_name, last_name, city } = req.query;
  const query = {};

  if (first_name) {
    query.first_name = { $regex: new RegExp(first_name, "i") };
  }
  if (last_name) {
    query.last_name = { $regex: new RegExp(last_name, "i") };
  }
  if (city) {
    query.city = { $regex: new RegExp(city, "i") };
  }

  try {
    const customers = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalCount = await User.countDocuments(query).exec();

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total: totalCount,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getCustomersById = async (req, res) => {
  const userId = req.params.id;

  try {
    const customer = await User.findById(userId).exec();

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};


export const getAllUniqueCities = async (req, res) => {
  try {
    const cities = await User.aggregate([
      { $group: { _id: "$city", count: { $sum: 1 } } },
      { $project: { _id: 0, city: "$_id", count: 1 } },
    ]).exec();

    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

export const createCustomers = async (req, res) => {
  const { first_name, last_name, city, company } = req.body;

  // Validate required fields
  if (!first_name || !last_name || !city || !company) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if city and company already exist
    const existingCity = await User.findOne({ city }).exec();
    const existingCompany = await User.findOne({ company }).exec();

    if (!existingCity || !existingCompany) {
      return res.status(400).json({ error: "City or company does not exist" });
    }

    // Create the new customer
    const newCustomer = new User({
      first_name,
      last_name,
      city,
      company,
    });

    // Save the customer to the database
    await newCustomer.save();

    res.json({ message: "Customer added successfully", customer: newCustomer });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};




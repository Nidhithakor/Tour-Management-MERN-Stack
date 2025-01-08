import Tour from "../models/Tour.js";

// create new tours

export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();

    res.status(200).json({
      sucess: true,
      message: "Sucessfully Created",
      data: savedTour,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "Failed to create. try again",
    });
  }
};

//update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      sucess: true,
      message: "Sucessfully Updated",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "Failed to update",
    });
  }
};

//delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      sucess: true,
      message: "Sucessfully Deleted",
      data: deleteTour,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "Failed to delete",
    });
  }
};

//  getSingleTour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate('reviews');

    res.status(200).json({
      sucess: true,
      message: "Sucessfull",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      sucess: false,
      message: "not found",
    });
  }
};

//getAll tour
export const getAllTour = async (req, res) => {
  // for paginition
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .populate('reviews')
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      sucess: true,
      count: tours.length,
      message: "Sucessfull",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      sucess: false,
      message: "not found",
    });
  }
};

// get tour by search
export const getTourBySearch = async (req, res) => {
  // here i means case sensitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {

    //gte means greater than equal
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    });

    res.status(200).json({
      sucess: true,
      message: "Sucessfull",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      sucess: false,
      message: "not found",
    });
  }
};



//get featured tour
export const getFeaturedTour = async (req, res) => {


  try {
    const tours = await Tour.find({featured:true})
    .populate("reviews")
    .limit(8);

    res.status(200).json({
      sucess: true,
      message: "Sucessfull",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      sucess: false,
      message: "not found",
    });
  }
};

// get tour counts 
export const getTourCount = async(req,res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount()

    res.status(200).json({
      sucess: true,
      data: tourCount,
    });
   
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "failed to fetch"
    });
  }
} 
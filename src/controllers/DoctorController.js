import Doctor from "../models/Doctor.js";
import CustomSuccess from "../utils/customResponse/customSuccess.js";
import CustomError from "../utils/customResponse/customError.js";

// UPDATE DOCTOR API
const updateDoctor = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const { name } = req.body;
    
    // Validate required fields
    if (!name || name.trim().length === 0) {
      return next(CustomError.createError("Name is required", 400));
    }
    
    if (name.length > 255) {
      return next(CustomError.createError("Name cannot exceed 255 characters", 400));
    }
    
    // Find doctor by ID
    const existingDoctor = await Doctor.query()
      .where('id', doctorId)
      .first();
    
    if (!existingDoctor) {
      return next(CustomError.createError(`Doctor with ID ${doctorId} not found`, 404));
    }
    
    // Update doctor data
    const updateData = {
      name: name.trim(),
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    
    const updatedDoctor = await Doctor.query()
      .where('id', doctorId)
      .update(updateData)
      .returning('*');
    
    // Get the updated doctor data
    const doctorData = await Doctor.query()
      .where('id', doctorId)
      .first();
    
    return next(
      CustomSuccess.createSuccess(
        { doctor: doctorData },
        `Doctor ${doctorId} updated successfully`,
        200
      )
    );
  } catch (error) {
    next(error);
  }
};

// GET DOCTOR API (Additional utility method)
const getDoctorById = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    
    const doctor = await Doctor.query()
      .where('id', doctorId)
      .first();
    
    if (!doctor) {
      return next(CustomError.createError(`Doctor with ID ${doctorId} not found`, 404));
    }
    
    return next(
      CustomSuccess.createSuccess(
        { doctor },
        `Doctor ${doctorId} retrieved successfully`,
        200
      )
    );
  } catch (error) {
    next(error);
  }
};

// GET ALL DOCTORS API (Additional utility method)
const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.query()
      .orderBy('created_at', 'desc');
    
    return next(
      CustomSuccess.createSuccess(
        { doctors, count: doctors.length },
        "All doctors retrieved successfully",
        200
      )
    );
  } catch (error) {
    next(error);
  }
};

const DoctorController = {
  updateDoctor,
  getDoctorById,
  getAllDoctors,
};

export default DoctorController;
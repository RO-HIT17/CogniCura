import { Request, Response } from 'express';
import { TimeSlotModel } from '../models/timeSlot'; // Adjust the path as needed

// Create a new time slot
export const createTimeSlot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { doctorId, start, end, isAvailable } = req.body;

    const timeSlot = new TimeSlotModel({
      doctorId,
      start,
      end,
      isAvailable: isAvailable !== undefined ? isAvailable : true, // Default to true
    });

    await timeSlot.save();
    res.status(201).json({ success: true, data: timeSlot });
  } catch (error) {
    console.error('Error creating time slot:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all time slots
export const getAllTimeSlots = async (req: Request, res: Response): Promise<void> => {
  try {
    const timeSlots = await TimeSlotModel.find().populate('doctorId'); // Populate doctorId to get doctor details
    res.status(200).json({ success: true, data: timeSlots });
  } catch (error) {
    console.error('Error fetching time slots:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get a time slot by ID
export const getTimeSlot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { timeSlotId } = req.params;
    const timeSlot = await TimeSlotModel.findById(timeSlotId).populate('doctorId');
    
    if (!timeSlot) {
      res.status(404).json({ msg: 'Time slot not found' });
      return;
    }

    res.status(200).json({ success: true, data: timeSlot });
  } catch (error) {
    console.error('Error fetching time slot:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update a time slot
export const updateTimeSlot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { timeSlotId } = req.params;
    const { start, end, isAvailable } = req.body;

    const timeSlot = await TimeSlotModel.findById(timeSlotId);
    if (!timeSlot) {
      res.status(404).json({ msg: 'Time slot not found' });
      return;
    }

    if (start) timeSlot.start = start;
    if (end) timeSlot.end = end;
    if (isAvailable !== undefined) timeSlot.isAvailable = isAvailable;

    await timeSlot.save();
    res.status(200).json({ success: true, data: timeSlot });
  } catch (error) {
    console.error('Error updating time slot:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a time slot
export const deleteTimeSlot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { timeSlotId } = req.params;
    const timeSlot = await TimeSlotModel.findByIdAndDelete(timeSlotId);
    
    if (!timeSlot) {
      res.status(404).json({ msg: 'Time slot not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Time slot deleted successfully' });
  } catch (error) {
    console.error('Error deleting time slot:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

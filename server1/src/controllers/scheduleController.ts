
import { Request, Response } from 'express';
import Schedule from '../models/schedule';


export const getSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching schedules' });
  }
};


export const getSchedulesByDate = async (req: Request, res: Response) => {
  const { date } = req.params;
  try {
    const schedules = await Schedule.find({ date });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching schedules' });
  }
};


export const addSchedule = async (req: Request, res: Response) => {
  const scheduleData = req.body;
  try {
    const newSchedule = new Schedule(scheduleData);
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: 'Error creating schedule' });
  }
};


export const deleteSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Schedule.findByIdAndDelete(id);
    res.status(200).json({ message: 'Schedule deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting schedule' });
  }
};

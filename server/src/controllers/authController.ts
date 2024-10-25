import { Request, Response } from 'express';
import { UserModel,IUser }  from '../models/userModel';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

export const registerUser = async (req: Request, res: Response) => {
  const { firstName,lastName,userName, mobile, email, password, role } = req.body;
  const existingEmail: IUser | null = await UserModel.findOne({ email });
  const existingUser: IUser | null = await UserModel.findOne({ userName });

  if (existingUser || existingEmail) {
    res.status(400).json({ msg: 'User already exists' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({ firstName,lastName,userName, mobile, email, password: hashedPassword, role });

  await user.save();
  const token = generateToken(user._id.toString(), user.role);
  res.status(201).json({ success: true, data: user, token });
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId, firstName,lastName,userName, mobile, email, password, role } = req.body;
    const user = await UserModel.findById(userId);
   
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
        user.lastName = lastName;
      }

    if (mobile) {
      user.mobile = mobile;
    }

    if (email) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        res.status(400).send('Email is already taken');
        return;
      }
      user.email = email;
    }

    if (userName) {
        const existingUser: IUser | null = await UserModel.findOne({ userName });
        if (existingUser && existingUser._id.toString() !== userId) {
          res.status(400).send('User Name is already taken');
          return;
        }
        user.userName = userName;
      }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (role) {
      user.role = role;
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Server error');
  }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }
  
    const token = generateToken(user._id.toString(), user.role);
    const id = user._id;
    res.status(200).json({ success: true, token, id });
  };


  export const getUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const user = await UserModel.findById(userId);
  
      if (!user) {
        res.status(404).send('User not found');
        return;
      }
  
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Server error');
    }
  };
  
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const user = await UserModel.findByIdAndDelete(userId);
  
      if (!user) {
        res.status(404).send('User not found');
        return;
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Server error');
    }
  };
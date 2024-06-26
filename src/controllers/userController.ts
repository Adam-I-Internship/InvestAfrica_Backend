import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import hashPassword from '../utils/password';
import validateUserData from '../utils/validateUser';

const prisma = new PrismaClient();

const registerUser = async (req: Request, res: Response) => {
  try {
    const userData = { ...req.body };
    delete userData.role;
    const validationError = validateUserData(userData);
    if (validationError) {
      return res.status(400).json({
        error: 'Input validation has failed. Please recheck your info.',
        message: validationError,
      });
    }
    try {
      delete userData.confirmPassword;
      const hashedPassword = await hashPassword(userData.accountPassword);
      const user = await prisma.user.create({
        data: {
          ...userData,
          accountPassword: hashedPassword,
        },
      });
      return res.status(201).json({
        message: 'User Registration Successful!',
        user: {
          ...user,
          accountPassword: '[redacted]',
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: (error as Error).message });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'User Registration Failed. Please try again later.',
      error: (error as Error).message,
    });
  }
};

export default registerUser;

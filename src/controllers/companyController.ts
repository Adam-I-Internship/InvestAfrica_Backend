import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import hashPassword from '../utils/password';
import validateCompanyData from '../utils/validateCompany';

const prisma = new PrismaClient();

const registerCompany = async (req: Request, res: Response) => {
  try {
    const companyData = { ...req.body };
    delete companyData.role;
    const validationError = validateCompanyData(companyData);
    if (validationError) {
      return res.status(400).json({
        error: 'Input validation has failed. Please recheck your info.',
        message: validationError,
      });
    }
    delete companyData.confirmPassword;
    const hashedPassword = await hashPassword(companyData.accountPassword);
    try {
      const company = await prisma.company.create({
        data: {
          ...companyData,
          accountPassword: hashedPassword,
        },
      });
      return res.status(201).json({
        message: 'Company Registration Successful!',
        company: {
          ...company,
          accountPassword: '[redacted]',
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: (error as Error).message });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Company Registration Failed. Please try again later.',
      error: (error as Error).message,
    });
  }
};

export default registerCompany;

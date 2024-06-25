import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { LoginType } from '../types/loginTypes';

const prisma = new PrismaClient();

const findAccountByEmail = async (email: string) => {
  const userAccount = await prisma.user.findUnique({
    where: { email },
  });

  if (userAccount) {
    return userAccount;
  }

  const companyAccount = await prisma.company.findUnique({
    where: { email },
  });

  if (companyAccount) {
    return companyAccount;
  }

  return null;
};

const loginAccount = async (req: Request, res: Response) => {
  try {
    const { email, accountPassword }: LoginType = req.body;
    const account = await findAccountByEmail(email);

    if (!account) {
      return res.status(400).json({ message: 'Cannot find account' });
    }

    const isPasswordValid = await bcrypt.compare(accountPassword, account.accountPassword);

    if (isPasswordValid) {
      return res.status(200).json({ message: 'Account authenticated.' });
    } else {
      return res.status(401).json({ message: 'Account cannot be authenticated.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login Failed. Please try again later.' });
  }
};

export default loginAccount;

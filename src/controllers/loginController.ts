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
    return { account: userAccount, type: 'User' };
  }

  const companyAccount = await prisma.company.findUnique({
    where: { email },
  });

  if (companyAccount) {
    return { account: companyAccount, type: 'Company' };
  }

  return null;
};

const loginAccount = async (req: Request, res: Response) => {
  try {
    const { email, accountPassword }: LoginType = req.body;
    const accountData = await findAccountByEmail(email);

    if (!accountData) {
      return res.status(400).json({ message: 'Cannot find account' });
    }

    const { account, type } = accountData;
    const isPasswordValid = await bcrypt.compare(accountPassword, account.accountPassword);

    if (isPasswordValid) {
      return res.status(200).json({ message: 'Account authenticated.', accountType: type });
    } else {
      return res.status(401).json({ message: 'Account cannot be authenticated.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Login Failed. Please try again later.' });
  }
};

export default loginAccount;

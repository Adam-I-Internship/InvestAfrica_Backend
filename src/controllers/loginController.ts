import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { LoginType } from '../types/loginTypes';

const prisma = new PrismaClient();

enum AccountType {
  User = 'User',
  Company = 'Company',
}

const checkAccountType = async (data: LoginType) => {
  const account = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (account) {
    return account;
  }
  const account2 = await prisma.company.findUnique({
    where: { email: data.email },
  });
  if (account2) {
    return account2;
  }
  return null;
};

const loginAccount = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    const account = await checkAccountType(data);
    console.log(account);
    if (account == null) {
      return res.status(400).json({ message: 'Cannot find account' });
    }

    if (await bcrypt.compare(data.accountPassword, account.accountPassword)) {
      return res.status(200).json({ message: 'Account authenticated.' });
    }
    return res.status(401).json({ message: 'Account cannot be authenticated.' });
  } catch (error) {
    return res.status(500).json({ error: 'Login Failed. Please try again later.' });
  }
};

export default loginAccount;

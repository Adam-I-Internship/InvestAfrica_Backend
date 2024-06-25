import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const companyDisplay = async(req: Request, res: Response) => {
    const account = await prisma.company.findMany({
        select: {
            companyName: true,
        },
    })
    res.status(200).send(account);
}

export default companyDisplay;
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../../../lib/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, userId, email, password, referredById, usdtAddress, walletType } = req.body;

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { userId: userId },
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                userId,
                email,
                password: hashedPassword,
                referredById,
                usdtAddress,
                walletType
            }
        });

        const token = generateToken(newUser.id);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                userId: newUser.userId,
                email: newUser.email
            },
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
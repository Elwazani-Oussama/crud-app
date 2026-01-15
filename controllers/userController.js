import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    const data = req.body;
    const user = await prisma.user.findFirst({
        where :{
            email : data.email
        }
    })
    if(user){
        return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(
        data.password, 
        10 
    );

    const NewUser = await prisma.user.create({
        data : {
            firstName : data.firstName,
            lastName : data.lastName,
            email : data.email,
            password : hashedPassword,
        }
    })
    return res.status(200).json({ message: 'User created successfully' })
}

export const login = (req, res) => {
    res.send('login')
}

export const logout = (req, res) => {
    res.send('logout')
}

export const forgotPassword = (req, res) => {
    res.send('forgot-password')
}

export const resetPassword = (req, res) => {
    res.send('reset-password')
}
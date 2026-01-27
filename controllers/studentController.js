import { prisma } from "../lib/prisma.js";

export const addStudent = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, enrollNumber } = req.body;
    const student = await prisma.student.findFirst({
        where: {
            email: email
        }
    })
    if (student) {
        return res.status(400).json({ message: "Student already exists" });
    }
    await prisma.student.create({
        data : {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            enrollNumber: parseInt(enrollNumber),
            submittedAt: new Date()
        }
    })
    return res.status(200).json({ message: "Student created successfully" });
}

export const getStudents = async (req, res) => {
    const { search } =  req.query;
    
    const students = await prisma.student.findMany({
        where : {
            OR : [
                { firstName : {contains : search, mode : "insensitive"}},
            ]
        }
    })
    return res.status(200).json({ students: students });
}
export const getStudentById = async (req, res) => {}
export const updateStudent = async (req, res) => {}
export const deleteStudent = async (req, res) => {}
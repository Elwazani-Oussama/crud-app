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
            deletedAt: null,
            OR : [
                { firstName : {contains : search, mode : "insensitive"}},
            ]
        }
    })
    return res.status(200).json({ students: students });
}
export const getStudentById = async (req, res) => {
    const { id } = req.params;
    const student = await prisma.student.findFirst({
        where : {
            id: id,
            deletedAt: null
        }
    })
    if(!student) {
        return res.status(400).json({ message: "Student not found" });
    }
    return res.status(200).json({ student: student });
}

export const updateStudent = async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    const student = await prisma.student.findFirst({
        where : {
            id: id,
            deletedAt: null
        }
    })
    const emailExists = await prisma.student.findFirst({
        where : {
            email: data.email,
            NOT: {
                id: id
            }
        }
    })
    if(emailExists) {
        return res.status(400).json({ message: "Email already exists" });
    }
    if(!student) {
        return res.status(400).json({ message: "Student not found" });
    }
    await prisma.student.update({
        where : {
            id: id
        },
        data : {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            enrollNumber: parseInt(data.enrollNumber),
        }
    })
    return res.status(200).json({ message: "Student updated successfully" });
}
export const deleteStudent = async (req, res) => {
    const {id} = req.params;
    const student = await prisma.student.findFirst({
        where : {
            id: id
        }
    })
    if(!student){
        return res.status(400).json({ message: "Student not found" });
    }
    await prisma.student.update({
        where :{
            id: id
        },
        data : {
            deletedAt: new Date()
        }
    })
    return res.status(200).json({ message: "Student deleted successfully" });
}
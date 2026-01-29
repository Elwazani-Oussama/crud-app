import express from "express";
const router = express.Router();

import {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { errorHandler, Validations } from "../Middlewares/validations.js";

router.post("/add", Validations.addStudent, errorHandler, addStudent);
router.get("/list", getStudents);
router.get("/list/:id", getStudentById);
router.put("/update/:id", Validations.updateStudent, errorHandler, updateStudent);
router.delete("/delete/:id", deleteStudent);

export default router;

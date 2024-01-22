import { Router } from "express";
import {
  getSchoolList,
  updateSchool,
  removeStudent,
  createSchoolList,
  getStudent,
} from "../controllers";

export const schools = Router();

schools.get("/", getSchoolList);
schools.get("/:id", getStudent);
schools.delete("/:id", removeStudent);
schools.patch("/:id", updateSchool);
schools.post("/", createSchoolList);

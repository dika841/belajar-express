import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSchoolList = async (req: Request, res: Response) => {
  try {
    const getSchool = await prisma.school.findMany();
    return res.json({
      statusCode: res.statusCode,
      data: getSchool,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const createSchoolList = async (req: Request, res: Response) => {
  try {
    const { name, age } = await req.body;
    const data = await prisma.school.create({
      data: {
        name,
        age,
      },
    });
    return res
      .status(201)
      .json({ statusCode: res.statusCode, message: "Berhasil dibuat", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Terjadi kesalahan dalam create siswa" });
  } finally {
    await prisma.$disconnect();
  }
};
export const getStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prisma.school.findUnique({
      where: { id: parseInt(id) },
    });
    if (!data) {
      return res.status(404).json({ error: "School not found" });
    }
    return res.json({
      status: res.statusCode,
      data: data,
    });
  } catch (error) {
    console.error("gagal mengambil data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};
export const removeStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteStudent = await prisma.school.delete({
      where: { id: parseInt(id) },
    });
    return res.json({
      statusCode: res.statusCode,
      message: "Berhasil Delete siswa",
      deleteStudent,
    });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan dalam menghapus siswa" });
  } finally {
    await prisma.$disconnect();
  }
};
export const updateSchool = async (req: Request, res: Response) => {
  try {
    const payload = await req.body;
    const { id } = req.params;
    if (!id) {
      res.json({ message: "Siswa tidak ditemukan" });
    }
    const data = await prisma.school.update({
      where: { id: parseInt(id) },
      data: { ...payload },
    });
    res.json({
      statusCode: res.statusCode,
      message: "Berhasil Update Data Siswa",
      data,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: res.statusCode,
      message: "Gagal mengupdate data",
      error: error,
    });
  } finally {
    await prisma.$disconnect();
  }
};

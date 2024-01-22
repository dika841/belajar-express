"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchool = exports.removeStudent = exports.getStudent = exports.createSchoolList = exports.getSchoolList = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getSchoolList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSchool = yield prisma.school.findMany();
        return res.json({
            statusCode: res.statusCode,
            data: getSchool,
        });
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getSchoolList = getSchoolList;
const createSchoolList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age } = yield req.body;
        const data = yield prisma.school.create({
            data: {
                name,
                age,
            },
        });
        return res
            .status(201)
            .json({ statusCode: res.statusCode, message: "Berhasil dibuat", data });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Terjadi kesalahan dalam create siswa" });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createSchoolList = createSchoolList;
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.school.findUnique({
            where: { id: parseInt(id) },
        });
        if (!data) {
            return res.status(404).json({ error: "School not found" });
        }
        return res.json({
            status: res.statusCode,
            data: data,
        });
    }
    catch (error) {
        console.error("gagal mengambil data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getStudent = getStudent;
const removeStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteStudent = yield prisma.school.delete({
            where: { id: parseInt(id) },
        });
        return res.json({
            statusCode: res.statusCode,
            message: "Berhasil Delete siswa",
            deleteStudent,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan dalam menghapus siswa" });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.removeStudent = removeStudent;
const updateSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield req.body;
        const { id } = req.params;
        if (!id) {
            res.json({ message: "Siswa tidak ditemukan" });
        }
        const data = yield prisma.school.update({
            where: { id: parseInt(id) },
            data: Object.assign({}, payload),
        });
        res.json({
            statusCode: res.statusCode,
            message: "Berhasil Update Data Siswa",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            statusCode: res.statusCode,
            message: "Gagal mengupdate data",
            error: error,
        });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.updateSchool = updateSchool;

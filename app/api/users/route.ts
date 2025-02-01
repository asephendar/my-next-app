import { NextResponse } from "next/server";
import { PrismaClient, Role, Status, tasks } from "@prisma/client";
import Error from "next/error";

const prisma = new PrismaClient();

/**
 * GET /api/users?role=Team
 * Mengambil daftar user berdasarkan role (hanya role "Team" yang diperbolehkan)
 */
export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const role = searchParams.get("role");

        if (role !== "Team") {
            return NextResponse.json(
                { error: "Invalid role. Only 'Team' role is allowed." },
                { status: 400 }
            );
        }

        const users = await prisma.users.findMany({
            where: { role: Role.Team },
            select: { id: true, email: true },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Failed to fetch users." },
            { status: 500 }
        );
    }
};

/**
 * POST /api/users
 * Menambahkan user baru dengan validasi email unik dan role yang sesuai
 */
// export const POST = async (req: Request) => {
//     const body: tasks = await req.json();
//     const tasks = await prisma.tasks.create({
//         data: {
//             title: body.title,
//             description: body.description,
//             status: body.status,
//             assignedToId: body.assignedToId,
//             createdById: body.createdById
//         }
//     });
//     return NextResponse.json(tasks, { status: 201 });
// }
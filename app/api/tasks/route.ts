// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import type { Task } from "@prisma/client";
// const prisma = new PrismaClient();

import { NextResponse } from "next/server";
import { PrismaClient, Role, Status, tasks } from "@prisma/client";
import Error from "next/error";

const prisma = new PrismaClient();

// export const POST = async (request: Request) =>{
//     const body: Task = await request.json();
//     const product = await prisma.product.create({
//         data:{
//             title: body.title,
//             price: body.price,
//             brandId: body.brandId
//         }
//     });
//     return NextResponse.json(product, {status: 201});
// }

export const POST = async (req: Request) => {
    const body: tasks = await req.json();
    const tasks = await prisma.tasks.create({
        data: {
            title: body.title,
            description: body.description,
            status: body.status,
            assigned_to_id: body.assigned_to_id,
            created_by_id: body.created_by_id
        }
    });
    return NextResponse.json(tasks, { status: 201 });
}
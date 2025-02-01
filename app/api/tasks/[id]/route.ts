import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { tasks } from "@prisma/client";
const prisma = new PrismaClient();

export const PUT = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: tasks = await request.json();
    const tasks = await prisma.tasks.update({
        where:{
            id: params.id
        },
        data:{
            title: body.title,
            description: body.description,
            status: body.status,
            assigned_to_id: body.assigned_to_id,
            created_by_id: body.created_by_id
        }
    });
    return NextResponse.json(tasks, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const Tasks = await prisma.tasks.delete({
        where:{
            id: params.id
        }
    });
    return NextResponse.json(Tasks, {status: 200});
}
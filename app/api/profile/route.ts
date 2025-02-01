// import { NextResponse } from 'next/server';
// import prisma from '@/app/lib/prisma'; // Import Prisma Client
// import { verifyToken } from '@/app/lib/middleware'; // Import middleware untuk memverifikasi token JWT

// export async function GET(request: Request) {
//   // Memverifikasi token JWT
//   const token = request.headers.get('Authorization')?.split(' ')[1];

//   if (!token) {
//     return NextResponse.json({ error: 'Token is required' }, { status: 401 });
//   }

//   try {
//     // Menggunakan middleware untuk memverifikasi token dan mendapatkan user
//     const user = verifyToken(token);

//     if (!user) {
//       return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
//     }

//     // Mengambil profil pengguna dari database berdasarkan ID yang terverifikasi
//     const profile = await prisma.users.findUnique({
//       where: { id: user. },
//       select: {
//         id: true,
//         email: true,
//         role: true,
//         created_at: true,
//         tasks_created: true,
//         tasks_assigned: true,
//       },
//     });

//     if (!profile) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     // Mengembalikan profil pengguna
//     return NextResponse.json(profile, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error retrieving profile' }, { status: 500 });
//   }
// }

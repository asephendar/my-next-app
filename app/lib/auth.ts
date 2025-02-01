// import jwt from "jsonwebtoken";
// import { NextResponse } from 'next/server';

// export const getUserIdFromToken = (req: NextResponse) => {
//     const cookies = req.cookies;
    
//     if (!cookies || !cookies.get('token')) {
//       throw new Error("Token not found.");
//     }
  
//     const token = cookies.get('token');
  
//     if (typeof token === 'undefined') {
//       throw new Error("Token is undefined.");
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//       return decoded.userId;
//     } catch (err) {
//       throw new Error("Invalid token.");
//     }
//   };
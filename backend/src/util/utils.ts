// import { verify } from 'jsonwebtoken';
// import { Ctx } from '../types';

// interface Token {
//   userId: string;
// }

// /**
//  * getuserId
//  *
//  * @param { Context } context Prisma instance
//  *
//  * @returns { void }
//  */
// export function getUserId(context: Ctx): string {
//   try {
//     const { Authorization } = context.event.headers;

//     if (!Authorization) {
//       throw new Error('Not authorized');
//     }

//     const token = Authorization.replace('Bearer ', '');
//     const verifiedToken = verify(token, process.env.APP_SECRET) as Token;

//     return verifiedToken?.userId;
//   } catch (error) {
//     throw new Error('Not authorized');
//   }
// }

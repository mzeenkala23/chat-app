import { Users } from '../entities/Users';



// export const seedUsers = async(): Promise<Users[]> => {
//     const users = [
//         await Users.create({
//             firstName: "john",
//             lastName: "doe",
//             email: "john.doe@gmail.com",
//             gender: "male"
//         }),
//         await Users.create({
//             firstName: "sam",
//             lastName: "doe",
//             email: "sam.doe@gmail.com",
//             gender: "male"
//         }),
//         await Users.create({
//             firstName: "jan",
//             lastName: "doe",
//             email: "jane.doe@gmail.com",
//             gender: "female"
//         }),
//     ];
//     return Promise.all(users);
//   };
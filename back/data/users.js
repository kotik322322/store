import bcrypt from "bcryptjs"



const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Konstantin',
        email: 'Konstantin@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Elena',
        email: 'Elena@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users
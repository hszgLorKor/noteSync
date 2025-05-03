import bcryptjs from 'bcryptjs';

export default async function hashPassword(password) {
    const saltRounds = 10;
    return await bcryptjs.hash(password, saltRounds);
}
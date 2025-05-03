import bcryptjs from "bcryptjs";

export default async function comparePassword(password, hash) {
    return await bcryptjs.compare(password, hash);
}
import bcryptjs from 'bcryptjs';

const hashPassword = async (password) => {
    const saltRounds = 10; // Adjust cost factor as needed
    const hash = await bcryptjs.hash(password, saltRounds);
    return hash;
};

// Compare a password with its hash
const comparePassword = async (password, hash) => {
    const isMatch = await bcryptjs.compare(password, hash);
    return isMatch;
};

module.exports = { hashPassword, comparePassword };

//TODO move this module to database!
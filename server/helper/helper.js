import bcrypt from 'bcrypt';

const Helper = {
  hashThePassword(password) {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
  },
  checkThepassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
};
export default Helper;

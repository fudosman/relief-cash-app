
class hashService {

  static async hashPassword(password) {
    try {
      console.log("hashPassword");
      return password;
    } catch (error) {
      throw new Error(`Error hashing user password: ${error.message}`);
    }
  }

}

module.exports = hashService;

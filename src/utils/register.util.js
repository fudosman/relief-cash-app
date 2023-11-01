
class RegistrationUtil {
  static async splitFullName(fullName) {
    const allNames = fullName.split(' ');
    const firstName = allNames[0];
    const middleName = allNames[1];
    const surname = allNames[2];

    return {
      firstName,
      middleName,
      surname,
    }
  }
}

module.exports = RegistrationUtil;

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

  static async formatPhoneNumber(phoneNumber, countryCode = 234) {
    const formattedPhoneNumber = phoneNumber[0] === 0 || '0' ? phoneNumber.replace(/^0+/, '') : phoneNumber;

    const fullPhoneNumber = `+${countryCode}${formattedPhoneNumber}`;

    return fullPhoneNumber;
  }
}
module.exports = RegistrationUtil;
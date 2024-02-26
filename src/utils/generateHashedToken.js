import md5 from "md5";
import { PASSWORD } from "../.env";

const generateHashedToken = () => {
  const getCurrentTimeStamp = () => {
    function addLeadingZero(digit) {
      if (digit < 10) {
        digit = "0" + digit;
      }
      return digit;
    }

    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const timeStamp =
      currentYear.toString() +
      addLeadingZero(currentMonth.toString()) +
      addLeadingZero(currentDate.toString());
    return timeStamp;
  };

  const token = `${PASSWORD}_${getCurrentTimeStamp()}`;

  const hashedToken = md5(token);

  // console.log(`Password: ${PASSWORD}`);
  // console.log(`Generated Token: ${token}\nHashed Token: ${hashedToken}`);

  return hashedToken;
};

export default generateHashedToken;

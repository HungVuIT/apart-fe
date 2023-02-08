function checkString(str: string) {
  let hasNumber = false;
  let hasUpperCase = false;
  let hasLowerCase = false;

  for (let i = 0; i < str.length; i++) {
    const char: any = str.charAt(i);
    if (!isNaN(char * 1)) {
      hasNumber = true;
    } else if (char === char.toUpperCase()) {
      hasUpperCase = true;
    } else if (char === char.toLowerCase()) {
      hasLowerCase = true;
    }
  }

  return hasNumber && hasUpperCase && hasLowerCase;
}
export default checkString;

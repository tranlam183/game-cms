export const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/;
/**
 *  Must contain:
 *  + At least 8 characters
 *  + One uppercase letter
 *  + One lowercase letter
 *  + One special character
 *  + One number.
 */
export const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

export const numberRegex = /^[0-9]\d*$/;

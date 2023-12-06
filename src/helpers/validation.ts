export const isEmail = (enteredEmail: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(enteredEmail);

export const isNotEmpty = (value: string) => {
  return value.trim() !== "";
};

export const hasMinLength = (value: string, minlength: number) => {
  return value.length >= minlength;
};

export const isPassword = (value: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
  return passwordRegex.test(value);
};

export const isEquals = (value: string, otherValue: string) => {
  return value === otherValue;
};

export const isalpha = (value: string) => {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(value);
};

export const hasUppercase = (value: string) => {
  return /[A-Z]/.test(value);
};

export const hasLowercase = (value: string) => {
  return /[a-z]/.test(value);
};

export const hasNumber = (value: string) => {
  return /\d/.test(value);
};

export const hasSpecialCharacter = (value: string) => {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
};

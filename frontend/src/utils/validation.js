export const validateEmail = (email) => {
  if (email.trim()) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  return false;
};

export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      minLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSymbol: false,
    };
  }
  // Define your backend password requirements here
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const isValid = minLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol;

  return {
    isValid,
    minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSymbol,
  };
};

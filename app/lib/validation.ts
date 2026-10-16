// The same rules as the backend's validators in x.py.
// Each function returns an error message, or "" if the value is valid.

export function validateName(name: string): string {
  const length = name.trim().length;
  return length >= 2 && length <= 20 ? "" : "Navn skal være 2–20 tegn";
}

export function validateEmail(email: string): string {
  // Exact same regex as REGEX_EMAIL in the backend's x.py
  return /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.trim()) ? "" : "Ugyldig email";
}

export function validatePhone(phone: string): string {
  if (!phone.trim()) return "";   // phone is optional
  return /^(\+45)?\s?(\d{2}\s?){4}$/.test(phone.trim()) ? "" : "Ugyldigt telefonnummer";
}

export function validatePassword(password: string): string {
  // Exact same regex as REGEX_USER_PASSWORD in the backend's x.py: ^.{8,50}$
  return /^.{8,50}$/u.test(password) ? "" : "Adgangskoden skal være 8–50 tegn";
}

export function validatePlate(plate: string): string {
  return /^[A-Z0-9 ]{2,10}$/.test(plate.trim().toUpperCase()) ? "" : "Nummerpladen skal være 2–10 tegn";
}
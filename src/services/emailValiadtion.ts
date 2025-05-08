import { ABSTRACT_EMAIL_API_KEY, ABSTRACT_EMAIL_BASE_URL } from '../config/abstractEmailConfig';

export const validateEmail = async (email: string): Promise<boolean> => {
  const url = `${ABSTRACT_EMAIL_BASE_URL}/?api_key=${ABSTRACT_EMAIL_API_KEY}&email=${encodeURIComponent(email)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const isValidFormat = data.is_valid_format?.value;
    const isMxFound = data.is_mx_found?.value;
    return Boolean(isValidFormat && isMxFound);
  } catch (error) {
    console.error('Error validating email:', error);
    return false;
  }
};

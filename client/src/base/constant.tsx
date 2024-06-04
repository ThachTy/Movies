
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
const PHONE_REGEX = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/


/* KEY SESSION - LOCAL STORAGE */
const TICKET_STORAGE_KEY = 'ticket'
const LOGIN_STORAGE_KEY = 'login'

/* */
export { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX, LOGIN_STORAGE_KEY, TICKET_STORAGE_KEY };

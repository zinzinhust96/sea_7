const BACKEND_API = 'http://ec2-35-153-68-36.compute-1.amazonaws.com'

// authentication
export const LOGIN_URL = `${BACKEND_API}/api/v1/auth/login`
export const LOGOUT_URL = `${BACKEND_API}/api/v1/auth/logout`
export const REGISTER_URL = `${BACKEND_API}/api/v1/auth/register`

// account
export const CREATE_ACCOUNT_URL = `${BACKEND_API}/api/v1/accounts`

// categogies
export const GET_CATEGORIES_URL = `${BACKEND_API}/api/v1/categories`
export const CREATE_CATEGORY_URL = `${BACKEND_API}/api/v1/categories`

// transactions
export const CREATE_TRANSACTION_URL = `${BACKEND_API}/api/v1/transactions`

// Saving account
export const SAVING_ACCOUNT_URL = `${BACKEND_API}/api/v1/accounts/saving`

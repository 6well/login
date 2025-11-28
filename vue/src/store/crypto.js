import CryptoJS from 'crypto-js'
const FRONTEND_SALT = process.env.VUE_APP_ENCRYPTION_SALT || 'login-zhu-shi-2025'
/**
 * SHA-256 加密
 */
export function sha256Encrypt(password, salt = FRONTEND_SALT) {
    return CryptoJS.SHA256(password + salt).toString()
}

export function secureEncrypt(password) {
    return sha256Encrypt(password)
}

export default {
    sha256Encrypt,
    secureEncrypt
}
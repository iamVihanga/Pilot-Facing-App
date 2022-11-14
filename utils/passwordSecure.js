const CryptoJS = require('crypto-js')

const passwordSecret = process.env.PASSWORD_SECRET || 'duber-secret'

// Password security
const EncryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, passwordSecret).toString()
}
const DecryptPassword = (hashedPassword) => {
    return CryptoJS.AES.decrypt(hashedPassword, passwordSecret).toString(CryptoJS.enc.Utf8)
}

module.exports = { EncryptPassword, DecryptPassword }
/** AES-128-CBC加密模式，key需要为16位，key和iv可以一样 */
/* eslint-disable */
const keyconst = "fosunjinfu2017jm";
const CryptoJS = require("crypto-js")

/*
 * 加密
 * function encrypt(data) { var sendData = CryptoJS.enc.Utf8.parse(data); var
 * key = CryptoJS.enc.Utf8.parse(keyconst); var iv =
 * CryptoJS.enc.Utf8.parse(keyconst); return CryptoJS.AES.encrypt(sendData, key, {
 * iv : iv, mode : CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(); }
 */

export const encrypt = (data) => {
	var key = CryptoJS.enc.Utf8.parse(keyconst)
	var srcs = CryptoJS.enc.Utf8.parse(data)
	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	})
	return encrypted.toString()
}

/*
 *解密
 * function decrypt(data) { var key = CryptoJS.enc.Utf8.parse(keyconst); var iv =
 * CryptoJS.enc.Utf8.parse(keyconst);
 * 
 * var encryptedHexStr = CryptoJS.enc.Hex.parse(data); var srcs =
 * CryptoJS.enc.Base64.stringify(encryptedHexStr); alert(srcs);
 * 
 * return CryptoJS.AES.decrypt(srcs, key, { iv : iv, mode : CryptoJS.mode.CBC,
 * padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8); }
 */
export const decrypt = (data) => {
	 var key = CryptoJS.enc.Utf8.parse(keyconst)
	var decrypt = CryptoJS.AES.decrypt(data, key, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	})
	return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

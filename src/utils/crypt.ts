import crypto from "crypto";

const SECRET = "828F18CF0FEC067EC8E7EEA986EB7AA4";

// 加密方法
const encrypt = (str: string, secret = SECRET) => {
  const cipher = crypto.createCipher("aes192", secret);
  let enc = cipher.update(str, "utf8", "hex");
  enc += cipher.final("hex");
  return enc;
};

// 解密方法
const decrypt = (str: string, secret = SECRET) => {
  try {
    const decipher = crypto.createDecipher("aes192", secret);
    let dec = decipher.update(str, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  } catch (e) {
    return null;
  }
};

// 解密方法
const decryptJson = (str: string, secret = SECRET) => {
  try {
    const decipher = crypto.createDecipher("aes192", secret);
    let dec = decipher.update(str, "hex", "utf8");
    dec += decipher.final("utf8");
    dec = JSON.parse(dec);
    return dec;
  } catch (e) {
    console.log(e);
    console.log(`decryptJso解析失败`);
    return {};
  }
};

export { encrypt, decrypt, decryptJson };

const crypto = require('crypto');

const encrypt = (text) => {
  const algorithm = 'aes-256-ctr';
  const secretKey = 'infrastructure.losbb.k3mb4nggul4';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return JSON.stringify({
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  });
};

const decrypt = (param) => {
  const hash = JSON.parse(param);
  const algorithm = 'aes-256-ctr';
  const secretKey = 'infrastructure.losbb.k3mb4nggul4';
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
  return decrpyted.toString();
};

module.exports = {
  encrypt,
  decrypt
};

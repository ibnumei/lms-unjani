const { encrypt } = require('./EncryptDecrypt');

console.log('============================================');

const VAULT_MYSQL_PASSWORD_KEY = `${process.env.VAULT_NAME}_MYSQL_PASSWORD`;
console.log('VAULT_MYSQL_PASSWORD_KEY ', VAULT_MYSQL_PASSWORD_KEY);

process.env.MYSQL_PASSWORD = process.env[VAULT_MYSQL_PASSWORD_KEY];
console.log(process.env.MYSQL_PASSWORD && process.env.MYSQL_PASSWORD !== 'undefined' ? `MYSQL_PASSWORD is provided ${encrypt(process.env.MYSQL_PASSWORD)}` : 'MYSQL_PASSWORD not provided');

// vaultSecret image: "${dockerNexus}/${nsService}:${version}", secretEnv: secretEnv, registry: "${dockerRegistry}/${namespace}/${serviceName}:${version}"
console.log('!!! JANGAN LUPA UNTUK OVERWRITE GROOVY DI BUILD !!!');
console.log('============================================');

// TODO
// 1. Buat file Vault.js di bagian util acuannya ada di ms report
// 2. Langsung panggil di bagian app.js bagian pertama
// 3. Setiakan props yang di perlukan di bagian dev.env (Ingat dev tidak memiliki valut)
// 4. Tambahkan VAULT_NAME di bagian sit.env, uat.env dan prod.env

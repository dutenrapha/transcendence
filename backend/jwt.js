const base64Url = require('base64-url');

const header = {
  alg: 'HS256',
  typ: 'jwt',
}

const payload = {
  username: 'user1@user.com',
  name: 'Rapha',
  exp: new Date().getTime(),

}

const key = 'abcd123456'

// const headerEncoded = Buffer.from(JSON.stringify(header)).toString('base64');
// const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64');
const headerEncoded = base64Url.encode(JSON.stringify(header));
const payloadEncoded = base64Url.encode(JSON.stringify(payload));

console.log(headerEncoded, payloadEncoded);

const crypt = require('crypto');

const signature = crypt.createHmac('sha256', key)
.update(`${headerEncoded}.${payloadEncoded}`)
.digest("bin")

console.log(signature);



console.log(`${headerEncoded}.${payloadEncoded}.${base64Url.encode(signature)}`);
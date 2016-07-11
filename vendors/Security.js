/*Object declaration*/
    let Security = {};

/*Service requiring*/
    const crypto = require('crypto');

/*Public methods declaration*/

    Security.generateHash = generateHash;
    Security.verify = verify;
    Security.aesEncryption = aesEncryption;
    Security.aesDecryption = aesDecryption;

/*Private methods declarations*/
    Security._hash = _hash;
    Security._generateSalt = _generateSalt;

/*Exports*/
module.exports = Security;

/*Private methods definitions*/

    function _hash(text, salt) {
        let md5Salt = crypto.createHash('md5'),
            md5Text = crypto.createHash('md5'),
            sha1 = crypto.createHash('sha1');

        let encryptedSalt = md5Salt.update(salt).digest('hex'),
            encryptedText = md5Text.update(text).digest('hex');

        return sha1.update(encryptedSalt + encryptedText).digest('hex');
    }

    function _generateSalt(round) {
        round = round || 10;
        let randomByte = crypto.randomBytes(16);
        return randomByte.toString('base64', 0, round);
    }

/*Public Methods definitions*/

    function generateHash(text, round) {
        var self = this;
        return new Promise((resolve, reject) => {
            let salt = self._generateSalt(round);
            let hash = self._hash(text, salt);

            resolve({
                hash,
                salt
            });
        });
    }

    function verify(encrypted, text, salt) {
        var self = this;
        return new Promise((resolve, reject) => {
            if (encrypted === self._hash(text, salt)) {
                resolve();
            } else {
                reject(Error('Encrypted not match'));
            }
        });
    }

    function aesEncryption(data, key) {
        var cipher = crypto.createCipher('aes-256-ctr', key),
            encrypted = cipher.update(data.toString(), 'utf8', 'hex');

        encrypted += cipher.final('hex');

        return new Buffer(encrypted).toString('base64');
    }

    function aesDecryption(encryptedData, key) {
        var encrypted = new Buffer(encryptedData, 'base64').toString('hex'),
            decipher = crypto.createDecipher('aes-256-ctr', key),
            decrypted = decipher.update(encrypted, 'hex', 'utf8');

        decrypted += decipher.final('utf8');

        return decrypted;
    }

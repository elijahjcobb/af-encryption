/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 *
 * Copyright 2019 Elijah Cobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

import Cryptography = require("crypto");
import { ECErrorStack, ECErrorOriginType, ECErrorType } from "@elijahjcobb/error";


/**
 * ECCipher handles encryption and decryption in a easy to use interface. Supply a password and an optional salt to create a cipher instance.
 */
export class ECCipher {

	private readonly iv: Buffer = Buffer.alloc(16, 0);
	private readonly algo: string = "aes-256-cbc";
	private readonly password: Buffer;

	/**
	 * Create a new ECCipher instance.
	 * @param {string} password A password used to encrypt data.
	 */
	public constructor(password: Buffer) {

		this.password = password;

	}

	/**
	 * Encrypt data with a ECCipher instance.
	 * @param {Buffer} data Data to encrypt as a Buffer.
	 * @return {Buffer} The encrypted data returned as a Buffer.
	 */
	public encrypt(data: Buffer): Buffer {

		try {

			const key: Buffer = Cryptography.scryptSync(this.password, "", 32);
			const cipher: Cryptography.Cipher = Cryptography.createCipheriv(this.algo, key, this.iv);

			let encrypted: string = cipher.update(data.toString("binary"), "binary", "hex");
			encrypted += cipher.final("hex");

			return Buffer.from(encrypted, "hex");

		} catch (e) {

			throw ECErrorStack.newWithMessageAndType(ECErrorOriginType.BackEnd, ECErrorType.FailedToEncryptValue, new Error(`Could not encrypt buffer with length ${data.length}.`));

		}

	}

	/**
	 * Decrypt data with a ECCipher instance.
	 * @param {Buffer} data Data to decrypt as a Buffer.
	 * @return {Buffer} The decrypted data returned as a Buffer.
	 */
	public decrypt(data: Buffer): Buffer {

		try {

			const key: Buffer = Cryptography.scryptSync(this.password, "", 32);
			const decipher: Cryptography.Decipher = Cryptography.createDecipheriv(this.algo, key, this.iv);
			let decrypted: string = decipher.update(data, undefined, "utf8");
			decrypted += decipher.final("utf8");

			return Buffer.from(decrypted, "utf8");

		} catch (e) {

			throw ECErrorStack.newWithMessageAndType(ECErrorOriginType.BackEnd, ECErrorType.FailedToDecryptValue, new Error(`Could not decrypt buffer with length ${data.length}.`));

		}

	}


}
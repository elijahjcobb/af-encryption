"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const Crypto = require("crypto");
const af_error_1 = require("af-error");
/**
 * AFHash is abstract and has one static member hash() which takes a Buffer and returns a Buffer with the data hashed with the sha256 algorithm.
 */
class AFHash {
    /**
     * Hash a buffer with the 'sha256' algorithm.
     * @param {Buffer} data The input data to be hashed.
     * @return {Buffer} A hashed buffer.
     */
    static hash(data) {
        try {
            let hash = Crypto.createHash("sha256");
            hash.update(data);
            return hash.digest();
        }
        catch (e) {
            throw af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.BackEnd, af_error_1.AFErrorType.FailedToHashValue, new Error(`Could not encrypt buffer with length ${data.length}.`));
        }
    }
}
exports.AFHash = AFHash;

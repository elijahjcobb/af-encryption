# Error
An in depth error handling package.

## Included Structures
| Class | Description |
| --- | --- |
| `ECError` | The actual error object. Holds the stack, type, origin, and message. |
| `ECErrorStack` | A collection of `ECError` instances. Contains helper methods for creating `ECError` instances and helpful tools to tack on general messages to hide information from end user. |
| `ECErrorType` | An enum for different types of errors. |
| `ECErrorOriginType` | An enum for different possible origins of errors. |

## Import
```typescript
// Separately
import { ECError, ECErrorStack, ECErrorOriginType, ECErrorType } from "@elijahjcobb/error";

// All Together
import ECError = require("@elijahjcobb/error");
let error: ECError.ECError = new ECError.ECError();
let stack: ECError.ECErrotStack = ECError.ECErrorStack.newWithMessageAndType();
```

## Usage
TODO
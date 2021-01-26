# pino-prefix

A prefix wrapper for the pino logger, written in typescript with minimal lines of code.

## Example

```typescript
import pinoPrefix from "pino-prefix";

const logger = pinoPrefix("App > ", pino({}));

logger.info("Hello world");
```

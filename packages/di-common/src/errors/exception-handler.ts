import { RuntimeException } from "./exceptions/runtime.exception";
import { PrefixLogger, ConsoleLogger } from "@toes/core";

export class ExceptionHandler {
    private static readonly logger = new PrefixLogger(
        new ConsoleLogger(),
        ExceptionHandler.name
    );

    public handle(exception: RuntimeException | Error) {
        if (!(exception instanceof RuntimeException)) {
            ExceptionHandler.logger.error(exception.message, exception.stack);
            return;
        }
        ExceptionHandler.logger.error(exception.what(), exception.stack);
    }
}

import { ProcessLogger } from "../src";

const logger = new ProcessLogger(process);
logger.info("Hallo", "World");

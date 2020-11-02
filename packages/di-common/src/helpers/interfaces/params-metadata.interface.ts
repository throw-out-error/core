import { ParamData } from "@toes/core";

export type ParamsMetadata = Record<number, ParamMetadata>;
export interface ParamMetadata {
    index: number;
    data?: ParamData;
}

export class MeterBarError extends Error {

    public static RANGES_OVERLAP = "Ranges overlap";
    public static BAD_RANGE = "First element of range must be smaller than the second";
    public static BAD_TYPE = "Invalid MeterSectiont.type provided";
    public static BAD_LEVEL = "Level must be inside one of the ranges";

    message: string;
    name: string;
    stack: string;

    constructor(message?: string) {
        super(message);
        this.name = "MeterBarError";
        this.stack = (<any> new Error()).stack;
    }
}
/// <reference types="multer" />
export declare class AppService {
    processExcel(file: Express.Multer.File): Promise<number>;
    handleFile(stream: any): Promise<number>;
    validateFile(file: Express.Multer.File): Promise<void>;
}

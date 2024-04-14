"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const ExcelJS = require("exceljs");
const stream_1 = require("stream");
let AppService = exports.AppService = class AppService {
    async processExcel(file) {
        await this.validateFile(file);
        const stream = new stream_1.Readable();
        stream.push(file.buffer);
        stream.push(null);
        const result = await this.handleFile(stream);
        return result;
    }
    async handleFile(stream) {
        const workbook = new ExcelJS.Workbook();
        await workbook.csv.read(stream);
        const defaultSheet = workbook.worksheets[0];
        if (!defaultSheet) {
            throw new Error('No sheet exists');
        }
        let count = 0;
        const map = new Set();
        await defaultSheet.eachRow((row) => {
            try {
                if (row.number === 1)
                    return;
                const id = row.getCell(1) ? row.getCell(1).text.trim() : '';
                const address = row.getCell(2) ? row.getCell(2).text.trim() : '';
                if (id && address) {
                    if (!map.has(id) && !map.has(address)) {
                        count++;
                    }
                    map.add(id);
                    map.add(address);
                }
            }
            catch (error) {
                throw new Error('Unknown Exception');
            }
        });
        return count;
    }
    async validateFile(file) {
        if (file.mimetype !== 'text/csv' &&
            file.mimetype !== 'application/vnd.ms-excel') {
            throw new Error('File is invalid');
        }
    }
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map
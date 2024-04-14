import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Readable } from 'stream';

@Injectable()
export class AppService {
  async processExcel(file: Express.Multer.File) {
    // validate file name and file mimetype
    await this.validateFile(file);

    // convert file buffer to stream
    const stream = new Readable();
    stream.push(file.buffer);
    stream.push(null); // Signal the end of the stream

    // process file
    const result = await this.processFile(stream);

    return result;
  }

  async processFile(stream: any) {
    const workbook = new ExcelJS.Workbook();

    await workbook.csv.read(stream);

    // get first worksheet in excel
    const defaultSheet = workbook.worksheets[0];
    if (!defaultSheet) {
      throw new Error('No sheet exists');
    }

    // number of different homes
    let count = 0;

    // set to save which homes already in the data
    const set = new Set<string>();

    // for example column 1 is houseID, column 2 is houseAddress.
    await defaultSheet.eachRow((row) => {
      try {
        if (row.number === 1) return;

        // get id data
        const id = row.getCell(1) ? row.getCell(1).text.trim() : '';

        // get address data
        const address = row.getCell(2) ? row.getCell(2).text.trim() : '';

        if (id && id !== '' && address && address !== '') {
          if (!set.has(id) && !set.has(address)) {
            count++;
          }

          set.add(id);
          set.add(address);
        }
      } catch (error) {
        throw new Error('Unknown Exception');
      }
    });

    return count;
  }

  async validateFile(file: Express.Multer.File) {
    if (
      file.mimetype !== 'text/csv' &&
      file.mimetype !== 'application/vnd.ms-excel'
    ) {
      throw new Error('File is invalid');
    }
  }
}

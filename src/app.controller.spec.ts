import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';

describe('AppController', () => {
  let appService: AppService;
  let endToEndApp: INestApplication;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = await app.resolve(AppService);

    endToEndApp = app.createNestApplication();
    await endToEndApp.init();
  });

  describe('root', () => {
    it('success case: should return 3', async () => {
      const filePath = 'files/test_picket.csv';
      const stream = await fs.createReadStream(filePath);
      const result = 3;
      expect(await appService.processFile(stream)).toBe(result);
    });

    it('/upload (POST)', async () => {
      const filePath = 'files/test_picket.csv'; // Path to the file you want to upload

      const response = await request(endToEndApp.getHttpServer())
        .post('/excel')
        .attach('file', filePath); // Attach the file to the request

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.text).toBe('3');
    });
  });

  afterEach(async () => {
    await endToEndApp.init();
  });
});

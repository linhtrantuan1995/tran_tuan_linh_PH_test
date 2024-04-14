"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Test APIs')
        .setDescription('Test APIs')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const options = {
        swaggerOptions: {
            displayOperationId: true,
            displayRequestDuration: true,
        },
    };
    swagger_1.SwaggerModule.setup('api/docs', app, document, options);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
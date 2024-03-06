import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';

require('dotenv').config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: process.env.LOGGER_ENABLE === 'false' ? ['warn', 'error'] : ['warn', 'error', 'debug', 'log', 'verbose'],
	});
	app.use('/swagger-ui.html', basicAuth({
		challenge: process.env.LOCK === 'true',
		users: { admin: 'Uit@2020' },
	}));
	app.enableCors();
	const options = new DocumentBuilder()
		.setTitle('Provenance Tracking')
		.setVersion('1.0')
		.addBearerAuth()
		.setContact('Nguyễn Hoàng Duy', 'https://ncc.asia/', 'duy.nguyenhoang@ncc.asia')
		.setDescription('SupplyChain management system');

	if (process.env.MODE === 'production') {
		options.addServer("https://");
	} else if (process.env.MODE === 'test') {
		options.addServer("/");
	}

	const document = SwaggerModule.createDocument(app, options.build());
	SwaggerModule.setup('/swagger-ui.html', app, document);
	await app.listen(process.env.SWAGGER_PORT || 3000);
}

bootstrap();

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
		users: { admin: process.env.SWAGGER_PASSWORD },
	}));

	app.enableCors((process.env.MODE === 'production' ? {
		origin: [
			'https://management.smcsoft.online',
			'https://smcsoft.online',
			'https://app.smcsoft.online',
			'https://www.management.smcsoft.online',
			'https://www.smcsoft.online',
			'https://www.app.smcsoft.online',
		],
	} : {}));
	
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
	await app.listen(process.env.PORT || 80);
}

bootstrap();

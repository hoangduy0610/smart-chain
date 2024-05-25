import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/UserModule';
import { DevelopController } from './develop.controller';

@Module({
    imports: [
        UserModule,
    ],
    providers: [],
    controllers: [DevelopController],
    exports: []
})
export class DevelopModule { }

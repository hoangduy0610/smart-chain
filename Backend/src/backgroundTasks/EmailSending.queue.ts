import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Mail } from 'src/interfaces/MailInterfaces';

@Processor('emailSending')
export class EmailSendingProcessor {
    constructor(
        private readonly mailService: MailerService
    ) { }

    @Process('reset-password')
    async sendResetPasswordEmail(job: Job<Mail>) {
        const { data } = job;
        const {
            extraData,
            ...mailerInfo
        } = data;

        await this.mailService.sendMail({
            ...mailerInfo,
            template: 'emails\\auth\\forgot-password',
            context: {
                ...extraData
            },
        }).then((res) => {
            Logger.log(res)
        }).catch((e) => {
            Logger.log(e)
        });
    }
}
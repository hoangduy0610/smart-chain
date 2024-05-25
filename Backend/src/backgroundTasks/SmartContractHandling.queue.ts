import { Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ethers } from 'ethers';
import { Constant, EEnvName } from 'src/commons/Constant';
import { EthersUtils } from 'src/utils/EthersUtils';

@Processor('SmartContractHandling')
export class SmartContractHandlingProcessor {
    constructor(
        @Inject('ETHERS') private readonly ethers: ethers.Provider,
        @Inject('ABI') private readonly abi: any,
    ) { }

    @Process('create-product')
    async addNewProductToSmartContract(job: Job<any>) {
        const { data } = job;

        const signer = EthersUtils.createWallet(Constant.getEnv(EEnvName.OWNER_WALLET_SECRET), this.ethers);
        const USDTContract = new ethers.Contract(Constant.getEnv(EEnvName.CONTRACT_ADDRESS), this.abi, signer);
        const transaction = await USDTContract.addProduct(data.productId, data.name, parseInt(data.price));
    }
}
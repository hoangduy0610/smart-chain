import { ethers } from 'ethers';
import { Constant, EEnvName } from 'src/commons/Constant';

// Initialize ethers with Infura WebSocket provider
const provider = new ethers.EtherscanProvider('holesky', Constant.getEnv(EEnvName.PROVIDER_KEY))
export const ethersProvider = {
    provide: 'ETHERS',
    useValue: provider,
};

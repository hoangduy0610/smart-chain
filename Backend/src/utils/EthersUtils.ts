import { ethers } from "ethers";

export class EthersUtils {
    public static createWallet = (privateKey: string, provider: ethers.Provider): ethers.Wallet => {
        return new ethers.Wallet(privateKey, provider)
    }
}
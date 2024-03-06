// @ts-ignore
import * as generate from 'nanoid/generate';

export class IdUtils {
	public static alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	public static generateId = (length: number) => generate(IdUtils.alphabet, length);
}

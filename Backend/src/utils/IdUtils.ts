export class IdUtils {
	public static alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	public static generateId = (length: number) => {
		// Generate a random string with the given length
		let result = '';
		for (let i = 0; i < length; i++) {
			result += IdUtils.alphabet.charAt(Math.floor(Math.random() * IdUtils.alphabet.length));
		}
		// Add seeding based on unix timestamp to reduce ID duplicates
		const timestamp = Math.floor(Date.now() / 1000).toString();
		result += timestamp;
		return result;
	}
}

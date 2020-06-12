const lib = require('./lib');

describe('absolute', () => {
	// test('should return a +ve number if input is +ve', () => {
	// 	const result = lib.absolute(1);

	// 	expect(result).toBe(1);
	// });
	it('should return a +ve number if input is +ve', () => {
		const result = lib.absolute(1);

		expect(result).toBe(1);
	});

	it('should return a -ve number if input is -ve', () => {
		const result = lib.absolute(-1);

		expect(result).toBe(1);
	});

	it('should return 0 if input is 0', () => {
		const result = lib.absolute(0);

		expect(result).toBe(0);
	});
});

describe('greet', () => {
	it('should return the greeting message', () => {
		const result = lib.greet('Subin');
		expect(result).toMatch(/Subin/);
		expect(result).toContain('Subin');
	});
});

describe('getCurrencies', () => {
	it('should return the supported currencies', () => {
		const result = lib.getCurrencies();
		expect(result).toEqual(expect.arrayContaining(['AUD', 'INR', 'USD']));
	});
});

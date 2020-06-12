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

describe('getProduct', () => {
	it('should return the product with the given id', () => {
		const result = lib.getProduct(1);
		//expect(result).toBe({ id: 1, price: 10 }); // it checks for memory location as well like ===
		expect(result).toEqual({ id: 1, price: 10 }); // it should have exact properties.
		expect(result).toMatchObject({ id: 1, price: 10 }); // it should contain the properties.
		expect(result).toHaveProperty('id', 1);
	});
});

describe('registerUser', () => {
	it('should should throw error if username is falsy', () => {
		const args = [null, undefined, NaN, '', 0, false];
		args.forEach(a => {
			expect(() => {
				lib.registerUser(a);
			}).toThrow();
		});
	});

	it('should should return a user object if valid username is passed', () => {
		const result = lib.registerUser('Subin');
		expect(result).toMatchObject({ username: 'Subin' });
		expect(result.id).toBeGreaterThan(0); // Since this is random number
	});
});

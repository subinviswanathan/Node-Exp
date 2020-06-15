module.exports.absolute = number => (number >= 0 ? number : -number);

module.exports.greet = name => 'Welcome ' + name;

module.exports.getCurrencies = () => ['INR', 'USD', 'AUD'];

module.exports.getProduct = productId => ({ id: productId, price: 10 });

module.exports.registerUser = username => {
	if (!username) throw new Error('Username is required.');

	return { id: new Date().getTime(), username };
};

const db = require('./db');
const mail = require('./mail');
module.exports.applyDiscount = order => {
	const customer = db.getCustomerSync(order.customerId);

	if (customer.points > 10) order.totalProce *= 0.9;
};

module.exports.notifyCustomer = order => {
	const customer = db.getCustomerSync(order.customerId);

	mail.send(customer.email, 'Order Placed');
};

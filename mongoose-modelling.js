// Relations of datas.. Trade off between query performance vs consistency.
// Using Refrences(Normalization) --> CONSISTENCY
let author = { name: 'Subin' };

let course = { author: 'id', authors: ['id1', 'id2'] };

// Using Embedded Documnets (Denormalization) --> PERFORMANCE
let course = {
	author: {
		name: 'Subin',
	},
};

// Hybrid (Snapshot of data at given time of time)
let author = {
	name: 'Subin',
	x: 1,
};

let course = {
	author: {
		id: 'ref',
		name: 'Subin',
	},
};

// refer mongoose-refrence.js and mongoose-embedded.js for examples.

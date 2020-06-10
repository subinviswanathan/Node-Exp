const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost/playground', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to Mongodb'))
	.catch(err => console.error('Could not connect to MongoDB... ', err));

// mongoose just validates the data. If the data is not present mongodb doesnt care whether the data is there or not.
// Built in Validators
// price: { type: Number, required: function() { return this.isPublished}}

const coureSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		match: /.*/i,
	},
	author: String,
	tags: {
		type: Array,
		validate: {
			validator: function (v) {
				return v && v.length > 0;
			},
			message: 'course should have at least one tag',
		},
	},
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: {
		type: Number,
		required: function () {
			return this.isPublished;
		},
		min: 10,
		max: 200,
	},
	category: {
		type: String,
		required: true,
		enum: ['web', 'mobile', 'network'],
	},
});
// List of schemas String, Number, Date, Buffer, Boolean, ObjectID, Array
// Classes and objects Course, nodecourse

const Course = mongoose.model('Course', coureSchema);

async function createCourse() {
	const course = new Course({
		name: 'Angular 8',
		author: 'Subin',
		tags: ['angular', 'frontend'],
		isPublished: true,
	});

	try {
		await course.validate();
		const result = await course.save();
		console.log(result);
	} catch (err) {
		console.log(err.message);
	}
}

//createCourse();

async function getCourese() {
	const courses = await Course.find({
		author: 'Subin',
		isPublished: true,
	})
		.limit(10)
		.sort({ name: 1 }) // -1 for descending order
		.select({ name: 1, tags: 1 });
	console.log(courses);

	// comparison operators
	// eq - equal
	// ne - not equal
	// gt - greater than
	// gte - greater than or equal to
	// lt - less than
	// lte - less than and equal to
	// in
	// nin - not in
	// courses with greater than Rs 10 and lte 20 -> Course.find({ price: { $gt: 10, $lte: 20 } });
	// courses that are 10,15,20 -> Course.find({ price: {$in: [10,15,20]} });

	// logical operators -> or and
	// Course.find().or([{author: 'subin},{isPublished: true}])

	// regular expressions. Course.find({author: /^Subin/}) // ^ Starts with
	// ends with /Subin$/i
	// author contains mosh /.*Mosh.*/ 0 or more

	// no of documents - Course.count();

	// pagination
	// const pageNumber = 2; // get this from api e.g api/courses?pageNumber=2&pagesize=10
	// const pageSize = 10;
	// Course.find()
	// 	.skip((pageNumber - 1) * pageSize)
	// 	.limit(pageSize);
}

getCourese();

async function updateCourse(id) {
	// Approach: Query First findById Modify properties and then save
	// Update First update directly and optionally get the documnet.

	const course = await Course.findById(id);
	if (!course) return;
	course.isPublished = true;

	course.set({
		isPublished: true,
		author: 'Subin',
	});

	const result = await course.save();
	console.log(result);

	// just update the data.
	const result1 = await Course.updateOne(
		{ _id: id },
		{
			$set: {
				author: 'Subin',
				isPublished: false,
			},
		}
	);

	// This gets the result Course.findByIdAndUpdate()
	console.log(result1);
}

// updateCourse('5ee0bfc3f4741d5d407dddc4');

async function removeCourse(id) {
	const result = await Course.deleteOne({ _id: id });

	// Course.findByIdAndRemove(id); return the result
	console.log();
}

removeCourse();

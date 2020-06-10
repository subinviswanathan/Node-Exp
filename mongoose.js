const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost/playground', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to Mongodb'))
	.catch(err => console.error('Could not connect to MongoDB... ', err));

const coureSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
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

	const result = await course.save();
	console.log(result);
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

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
	name: String,
	bio: String,
	website: String,
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
	'Course',
	new mongoose.Schema({
		name: String,
		author: authorSchema,
		// author: {
		// 	type: authorSchema,
		// 	required: true,
		// },
		//authors: [authorSchema] // Array of authors
	})
);

async function createAuthor(name, bio, website) {
	const author = new Author({
		name,
		bio,
		website,
	});

	const result = await author.save();
	console.log(result);
}

async function createCourse(name, author) {
	const course = new Course({
		name,
		author,
	});

	const result = await course.save();
	console.log(result);
}

async function listCourses() {
	const courses = await Course.find().select('name author');
	console.log(courses);
}

async function updateAuthor(courseId) {
	const course = await Course.update(
		{ _id: courseId },
		{
			$set: {
				'author.name': 'Jane Smith',
			},
			$unset: {
				'author.name': 'Jane Smith',
			},
		}
	);
	course.save();
}

async function addAuthor(id, author) {
	const course = await Course.findById(id);
	course.authors.push(author);
	course.save();
}

async function removeAuthors(cId, aId) {
	const course = await Course.findById(cId);
	const author = course.authors.id(aId);
	author.remove();
	course.save();
}

createAuthor('Subin', 'My bio', 'My Website');

// createCourse('Node Course', 'authorId')

// listCourses();

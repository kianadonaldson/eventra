const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const Event = require('./models/Event');

dotenv.config();
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);

const categories = [
    'Music',
    'Tech',
    'Sports',
    'Food',
    'Art',
    'Health',
    'Business',
    'Nightlife',
    'Networking'
]

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Event.deleteMany();

    const events = Array.from({ length: 50 }, () => {
        const category = faker.helpers.arrayElement(categories);

        return {
            title: `${category}: ${faker.company.catchPhrase()}`,
            location: faker.location.city(),
            date: faker.date.future(),
            description: faker.lorem.paragraph(),
            category
        };
    });

    await Event.insertMany(events);
    console.log('Seeded events');
    process.exit();
};

seed();
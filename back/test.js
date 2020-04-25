const User = require('./models/user');
const Task = require('./models/task');

const create = async () => {

    const result = await User.create({
        email: 'vanyalykwwww',
        password: '123'
    });

    const task = await Task.create({
        description: '123',
        date: '212',
        progress: '123',
        userId: 1
    });

    console.log(result);
    console.log(task);
}

create();

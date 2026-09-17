import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';

export async function seedUser(dataSource: DataSource) {
    const userRepository = dataSource.getRepository(User);

    const existingUser = await userRepository.findOne({
        where: {
            email: 'admin@clinickart.com',
        },
    });

    if (existingUser) {
        console.log('Admin user already exists');
        return;
    }

    const password = await bcrypt.hash('123456', 10);

    const user = userRepository.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@clinickart.com',
        phoneNumber: '03000000000',
        password,
    });

    await userRepository.save(user);

    console.log('Admin user created');
}
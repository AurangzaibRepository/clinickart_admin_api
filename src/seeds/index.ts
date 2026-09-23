import 'dotenv/config';
import { AppDataSource } from '../../data-source';
import { seedUser } from './user.seed';

async function seed() {
  await AppDataSource.initialize();

  try {
    await seedUser(AppDataSource);

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

seed();

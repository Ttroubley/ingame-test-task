import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { Role } from 'src/auth/roles-guard/roles.enum';
import { hashPassword } from '../utils';
export class SeedUserAdminRecord1682354412513 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(UserEntity);
    const password = await hashPassword('password');
    const adminUser = userRepository.create({
      username: 'admin',
      password,
      roles: [Role.Admin],
    });
    await userRepository.save([adminUser]);
  }

  async down(queryRunner: QueryRunner): Promise<void> {}
}

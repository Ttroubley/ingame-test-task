import { MigrationInterface, QueryRunner } from 'typeorm';
import { GenreEntity } from 'src/genres/entity/genre.entity';

export class SeedGenreRecords1682354142527 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const genreRepository = queryRunner.manager.getRepository(GenreEntity);

    const genre1 = genreRepository.create({
      name: 'Роман',
    });
    const genre2 = genreRepository.create({
      name: 'Детектив',
    });
    const genre3 = genreRepository.create({
      name: 'Антиутопия',
    });
    await genreRepository.save([genre1, genre2, genre3]);
  }

  async down(queryRunner: QueryRunner): Promise<void> {}
}

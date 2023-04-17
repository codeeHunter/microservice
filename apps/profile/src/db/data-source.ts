/* eslint-disable prettier/prettier */
import { ProfileEntity } from './../profile.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  entities: [ProfileEntity],
  migrations: ['dist/apps/profile/db/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);

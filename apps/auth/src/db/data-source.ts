/* eslint-disable prettier/prettier */
import { UserEntity } from './../user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  entities: [UserEntity],
  migrations: ['dist/apps/auth/db/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);

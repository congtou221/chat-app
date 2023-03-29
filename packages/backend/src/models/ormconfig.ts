export default {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'test',
  entities: ['src/models/**/*.ts'],
  synchronize: true,
};


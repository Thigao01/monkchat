import initdb from "./models/init-models.js"
import  Sequelize from 'sequelize'
const sequelize = new Sequelize(
    '5MnijCqZkf',
    '5MnijCqZkf',
    'cXNvMIr556', {
        host: 'remotemysql.com',
        dialect: 'mysql',
        loggin: false
    }
);

const db = initdb(sequelize);
export default db;
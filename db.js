const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

sequelize.authenticate().then(
    function() {
        console.log('Connected to WorkoutLog postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;
const { app } = require('./app');

//Models
const { Repair } = require('./models/repairs');
const { User } = require('./models/users');

//utils
const { db } = require('./utils/database');

//Database
// Authenticate database credentials
db.authenticate()
   .then(() => console.log('Database authenticated'))
   .catch(err => console.log(err));

//Establish models relation
// User.hasMany(Repair);
// Repair.belongsTo(User);

// Sync sequelize models
db.sync()
   .then(() => console.log('Database synced'))
   .catch(error => console.log(error));

//Server
const PORT = 2410;

app.listen(PORT, () => {
   console.log(`Express runnig on port: ${PORT}`);
});

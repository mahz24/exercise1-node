const { app } = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

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

// Sync sequelize models
db.sync()
   .then(() => console.log('Database synced'))
   .catch(error => console.log(error));

//Establish models relation
User.hasMany(Repair);
Repair.belongsTo(User);

//Server
const PORT = process.env.PORT;

app.listen(PORT, () => {
   console.log(`Express runnig on port: ${PORT}`);
});

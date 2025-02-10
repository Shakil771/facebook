const mongoose =require('mongoose');
const mongodbUrl  = "mongodb+srv://shakilhossaint58:shakilhossaint58@cluster0.jt7xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDatabase = async (options={}) => {
    try {
        await mongoose.connect(mongodbUrl, options);

        console.log('Connection to database is successfully established');

        mongoose.connection.on('error', (error)=>{
          console.error('Data Base Connection Error:',error);
        }); 
         
    } catch (error) {
       console.error('Could not connect to DataBase:',error.toString());
    }
} 
module.exports = connectDatabase;  
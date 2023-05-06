import {app} from './app.js';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js';



// handle uncaught exceptions
process.on('uncaughtException', err => {
    console.error(err);
    console.error(`Shutting down server due to uncaught exceptions`)
    process.exit(1);
}

)


dotenv.config({
    path: 'src/config/config.env'
})

// connecting to the database
connectDatabase()


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})


// handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log('shutting down server due to unhandled promise rejections');
    server.close(() => {
        process.exit(1)
    })

})
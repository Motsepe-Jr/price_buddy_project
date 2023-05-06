import mongoose from "mongoose";


const storeSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: [true, "Please enter store name"],
        trim:true,
        maxlength:[100, 'Store name must be less than 100 characters']   
    },

    description: {
        type: String,
    },


    logo: [
        {
            public_id: {
                type: String, 
            },
            url: {
                type: String,
                required:true, 
            }
        }
    ],


    createdAt: {
        type: Date,
        default: Date.now()
    }


})

export default mongoose.model("Stores", storeSchema)
import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: [true, "Please enter product name"],
        trim:true,
        maxlength:[100, 'Product name must be less than 100 characters']   
    },

    description: {
        type: String,
    },


    images: [
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

export default mongoose.model("Category", categorySchema)
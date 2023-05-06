import mongoose from "mongoose";


const specialSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim:true,
        maxlength:[100, 'Product name must be less than 100 characters']   
    },

    price: {
        type: String,
        trim:true,
        maxlength:[10, 'Price value must be less than 10 characters'],
    },

    promtoion_message: {
        type: String,
        required: [true, "Please enter price name"],
        trim:true,
    },


    images: [
        {
            public_id: {
                type: String, 
                required: true, 
            },
            url: {
                type: String,
                required:true, 
            }
        }
    ],



    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stores",
        required: true,
    },

    store_name: {
        type: String,
    },

    store_image: {
        type: String
    },


    createdAt: {
        type: Date,
        default: Date.now()
    }

    

})

export default mongoose.model("Special", specialSchema)
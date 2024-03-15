import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/Product")
    .then(() => console.log("DB connected"))
    .catch((error) => {
        if (error)
            throw new Error(error)
    })
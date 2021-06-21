import { Schema } from "mongoose";

export const AuthorSchema = new Schema({

    name: String,
    surName: String,
    nickName: String,

})
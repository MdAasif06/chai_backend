import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({

    videoFile: {
        type: String,
        required: true
    },
    thumbnail:{
        type:String,
        requried:true
    },
    title:{
        type:String,
        requried:true
    },
    description:{
        type:String,
        requried:true
    },
    duration:{
        type:Number, //cloudnary url
        requried:true
    },
    views:{
        type:String,
        requried:true
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

}, { timestamps: true, versionKey: false })

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("vider", videoSchema)
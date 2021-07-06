import * as mongoose from 'mongoose';
export const MovieSchema=new mongoose.Schema({
	title:String,
	meta:{
		rating:Number,
		aired:Number,
		runtime:Number,
	},
	visitors:Number,
	expectedVisitors: Number,
	genre:[String],
})

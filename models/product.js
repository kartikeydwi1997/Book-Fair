const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',//REF is used to get the type of the reference object. use the name of model whose id we are referencing.
        required:true
      }
  });

  module.exports=mongoose.model('Product',productSchema);
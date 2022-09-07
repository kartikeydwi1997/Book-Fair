const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
  name:{
    type:String,
    required:true
  },
    email:{
        type:String,
        required:true
    },
    cart:{
      items:[{ //quite complex object right 
        productId:{ //productId is the id of the product
          type:Schema.Types.ObjectId, //since we are using mongoose we need to use the objectId provided from schema.types which will be          ref:'Product',
          required:true , // used to get the type of the reference object.
          ref:'Product' //use the name of model whose id we are referencing.
        },
        quantity:{
          type:Number,
          required:true
        }
      }]
    }
});

userSchema.methods.addToCart=function(product){ // mongoose provide a methods key to create new methods on the schema which
  const cartProductIndex=this.cart.items.findIndex(cp=>{ // can be used to save new data in the database.
    return cp.productId.toString()===product._id.toString();
  });
  let newQuantity=1;
  const updatedCartItems=[...this.cart.items];
  if(cartProductIndex>=0){
    newQuantity=this.cart.items[cartProductIndex].quantity+1;
    updatedCartItems[cartProductIndex].quantity=newQuantity;
  }
  else{
    updatedCartItems.push({
      productId:product._id,
      quantity:newQuantity
    });
  }
  const updatedCart={
    items:updatedCartItems
  };
  this.cart=updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart=function(productId){
  const updatedCartItems=this.cart.items.filter(item=>{
    return item.productId.toString()!=productId.toString();
  });
  this.cart.items=updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart=function(){
  this.cart={items:[]};
  return this.save();
};

module.exports=mongoose.model('User',userSchema);

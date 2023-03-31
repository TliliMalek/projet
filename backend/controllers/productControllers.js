const productmodel = require("../model/Product");
const review = require("../model/review");

// add product
module.exports.addProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const existeprod = await productmodel.findOne({ name });
    // console.log(existeprod)
    if (existeprod) {
      return res.status(400).send({ msg: "produit deja existe" });
    }
    const newproduct = new productmodel({
      ...req.body,
    });
    await newproduct.save();
    res.send({ product: newproduct });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};
module.exports.getallproducts = async (req, res) => {
  try {
    
  
   const  products = await productmodel.find({})
   
    res.send({ products });
  } catch (error) {
    res.send({ msg: error.message });
  }
};
module.exports.getoneprod = async (req, res) => {
  try {
    const { idprod } = req.params;
    const prod = await productmodel.findById(idprod);
    res.send({ product: prod });
  } catch (error) {
    res.send({ msg: error.message });
  }
};
module.exports.updateprod = async (req, res) => {
  try {
    const { idprod } = req.params;
    const prod = await productmodel.findByIdAndUpdate(idprod, {
      ...req.body
    },{new:true});
    res.send({product:prod})
  } catch (error) {
    res.send({ msg: error.message });
  }
};
module.exports.deleteprod= async(req,res)=> {
try {
    const {idprod} =req.params
    const prod = await productmodel.findByIdAndRemove(idprod)
res.send({msg:"product delete sucussive"})
} catch (error) {
    res.send({msg:error.message})
}

}




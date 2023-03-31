const userModel = require("../model/User");
const { hashPwd, comparePwd } = require("../utils/passwordFunctions");
const createtoken = require("../utils/Token");

module.exports.register = async (req, res) => {
  const { email, pasword } = req.body;
  console.log(req.body);
  try {
    //verefier si l'utilisateur exsite
    const existeUser = await userModel.findOne({ email });

    if (existeUser) {
      return res.status(400).send({ msg: "user exsists" });
    }
    const hashed = await hashPwd(pasword);
    const user = new userModel({ ...req.body, pasword: hashed });
    await user.save();
    res.send({ msg: "the user successfully created" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
module.exports.loginuser = async (req, res) => {
  const { email, pasword } = req.body;
  console.log(req.body);
  try {
    //1) verefier si l'utilisateur exsite
    const existeUser = await userModel.findOne({ email });    console.log(existeUser)
    if (!existeUser) {
      return res.status(400).send({ msg: "bad credentials(email)" });
    }
    //2) password verification
    const match = comparePwd(pasword, existeUser.pasword);
    if (!match) {
      return res.status(400).send({ msg: "bad credentials(password)" });
    }
    //3) token creation
    const payload= {userid: existeUser._id}
    const token = createtoken(payload)
existeUser.pasword=undefined
    //4) response
    res.send({ token,msg:'user succsessfully logged in', user:existeUser})

  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports. getCurrentUser = (req, res)=>{
  try {
    res.send({user:req.user, })
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }

}
module.exports.getAllUsers = async (req, res) => {
  try {
     const allusers= await userModel.find()
     res.send({users: allusers})
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }

}
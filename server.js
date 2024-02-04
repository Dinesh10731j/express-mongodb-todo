const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const Port = process.env.PORT || 8080;

const createData = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Herox");
    console.log("Database Connected");
  } catch (err) {
    console.log(`Cannot connected to database: ${err}`);
  }
};

const Heroxschema = mongoose.Schema({
  todo: String,
});

const Heroxmodel = mongoose.model("HEROX", Heroxschema);

createData();

app.post("/", async (req, res) => {

const Checktodo = await Heroxmodel.findOne({todo:req.body.todo});

if(Checktodo){
    return res.json({message:"Already exits the todo"});
}
if(!Checktodo){
    return res.json({message:""});
}

  const HeroxUser = new Heroxmodel({
    todo: req.body.todo,
  });

  const User = await HeroxUser.save();

  console.log(User);
  res.json(User);
});


app.delete ("/",async (req,res)=>{
    try {
        const todoToDelete = req.body.todo; 
    
        const deletedTodo = await Heroxmodel.deleteOne({ todo: todoToDelete });
    
        if (deletedTodo.deletedCount > 0) {
          res.json({ message: "Todo deleted successfully" });
        } else {
          res.status(404).json({ message: "Todo not found" });
        }
      } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
    


app.listen(Port, () => {
  console.log(`Listening to port ${Port}`);
});

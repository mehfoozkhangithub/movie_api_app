const express = require("express");
require("dotenv").config();

// const port = 7500;
const app = express();

app.use(express.json());

const { Connections, UserModule } = require("./db");

app.get("/", async (req, res) => {
  const data = req.body;
  try {
    const addManyData = await UserModule.updateMany({}, { $set: data });
    res.send(addManyData);
    console.log(`data was added... in every documents..`);
  } catch (err) {
    console.log(err);
  }
});
app.get("/user", async (req, res) => {
  const params = req.query;
  try {
    const users = await UserModule.find(params);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send({ err: "something went wrong..." });
  }
});
app.post("/createuser", async (req, res) => {
  try {
    let payload = req.body;
    //*  this is the way we insert data in mongo db formate
    // await UserModule.insertMany([payload]);

    //? now we insert the data in mongoose way
    // in case if you inserting in one data use this code write below
    const payloadMongooseWay = new UserModule(payload);
    await payloadMongooseWay.save();
    res.send("sucessfully created");
  } catch (error) {
    console.log(err);
    res.send({ err: "something went wrong..." });
  }
});

app.put("/userupdate/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  const payload = req.body;

  try {
    const query = await UserModule.findByIdAndUpdate({ _id: userId }, payload);
    console.log(query);
    res.send("Update");
  } catch (err) {
    console.log(err);
    res.send({ err: "something went wrong... try anagin later." });
  }
});

app.delete("/deleteuser/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    await UserModule.findByIdAndDelete({ _id: userId });
    res.send(`user id ${userId} have been deleted`);
  } catch (err) {
    console.log(err);
    res.send({ err: "something went wrong... try anagin later." });
  }
});

app.listen(process.env.Port, async () => {
  try {
    await Connections;
    console.log("Connected into DB Succesfully...");
  } catch (err) {
    console.log(err);
    console.log("Connected into DB Failed!!!");
  }
  console.log(`your port is on ${process.env.Port}`);
});

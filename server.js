import server from "./index.js";
import { connectToDB } from "./src/MongoDB/mongoDB.js";

server.listen(3000,async ()=>{
    await connectToDB();
    console.log("Server is listening at 3000");
})
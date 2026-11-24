import "dotenv/config";
import app from "./app.js";
import connetToDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

await connetToDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

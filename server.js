import app from "./src/app.js";
import "dotenv/config";

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server running in ${port}`);
});

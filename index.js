const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = 1200;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


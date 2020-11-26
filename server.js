const express = require("express");
const app = express();
const path = require("path");

app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./server/routes/api/users"));
app.use("/api/auth", require("./server/routes/api/auth"));
app.use("/api/profile", require("./server/routes/api/profile"));
app.use("/api/signature", require("./server/routes/api/signature"));
app.use("/api/subscribe", require("./server/routes/api/subscribe"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 4000;
app.listen(
    PORT,
    console.log(`------------- 🌿 started on port ${PORT}-----------\n`)
);

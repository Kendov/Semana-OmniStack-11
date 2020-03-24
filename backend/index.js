const express = require('express');

const app = express();


app.get("/", (req, res)=>{
    res.json({
        data: "test",
        array:["test1", "test2"]
    });
});

app.listen(7000);
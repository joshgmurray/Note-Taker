const router = require("express").Router();
const path = require('path');
const fs = require('fs');
const DB = fs.readFileSync(path.resolve(__dirname, "../db/db.json"));

router.get("/notes", (req, res) => {
    console.log("get rquest api ===");
    try {
        res.status(200).json(JSON.parse(DB));
    } catch (error) {
        console.log(err);
        res.status(500).json({
            message: "failed to get data",
            error: err,
        });
    }
});

router.post("/notes", (req, res) => {
    console.log("post rquest api ===", req.body);
    let JSONData = JSON.parse(DB);
    
    try {
        if (req.body) {
            JSONData.push(req.body);
            fs.writeFile(path.resolve(__dirname, "../db/db.json"), JSON.stringify(JSONData), (err) => {
                if (err) {
                    console.log('add note error ===', err);
                    res.status(500).json({
                        message: "failed to add data",
                        error: err,
                    });
                }
                res.status(200).json({
                    message: "add note success",
                    data: req.body,
                });
            })
        }
        
    } catch (error) {
        console.log(err);
        res.status(500).json({
            message: "unexpected error",
            error: err,
        });
    }
});

module.exports = router;

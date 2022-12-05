const image = {
    upload: (req, res) => {
        console.log(req.body)
        if (req.file) {
            res.json(req.file.path);
        } else {
            res.json("Please upload a valid image");
        }
    }
}

module.exports = image
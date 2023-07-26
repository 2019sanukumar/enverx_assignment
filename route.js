const express = require('express');
const Model = require('../model/model');
const router = express.Router()
router.use(express.json())



router.post('/blog/post', async (req, res) => {
    if (req.body.content == null)
    {
        res.status(400).json({message: "post can't be empty"})
    }
    const data = new Model({
        content: req.body.content
    })
    try{
        const ifDataSaved = await data.save();
        res.status(200).json(ifDataSaved)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})


router.get('/posts', async (req,res) => {
    try{
        const data = await Model.find().sort({ date : -1 });
        res.json(data)
        res.status(200).json("found all blog")
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


router.get('/post/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


router.patch('/update/post/:id', async (req, res) => {
    try {
        const post_id = req.params.id;
        const updated_post = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            post_id, updated_post, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



router.delete('/delete/post/:id', async (req, res) => {
    try {
        const post_id = req.params.id;
        const post_data = await Model.findByIdAndDelete(post_id)
        res.send(`Document with ${post_data.name} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
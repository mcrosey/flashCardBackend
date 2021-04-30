const { FlashCard , validate } = require('../model/products');
const express = require('express');
const router = express.Router();
//product green validate yello


router.post('/', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error);
//product  blue Product green
        const flashcard = new FlashCard({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
        });
//product green
        await FlashCard.save();
 //product  blue       
        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//finds all
//product  blut = green
//products blue
router.get('/', async (req, res) => {
    try {
        const flashcard = await FlashCard.find();
        return res.send(flashcard);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//finds just on specific
//product blue = product gree
router.get('/:id', async (req, res) => {
    try {
        const flashcard = await FlashCard.findById(req.params.id);

        if (!flashcard)
            return res.status(400).send(`The product with id "${req.params.id}" does not exsist.`);
//product blue
            return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } =validate(req.body);
        if (error) return res.status(400).send(error);
//product blue = product green
        const flashcard = await FlashCard.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                // price: req.body.price,
            },
            { new: true }
        );
//product blue
        if (!flashcard)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

            await FlashCard.save();

            return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/id', async (req, res) => {
    try {
      //produt blue = produce gree  
        const flashcard = await FlashCard.findByIdAndRemove(req.params.id);

        if (!product)
            return res.status(400).send(`The product with id "${res.params.id}" does not exist.`);
//product blue
            return res.send(flashcard);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
module.exports = router;
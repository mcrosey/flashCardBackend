const { FlashCard , validate } = require('../model/products');
const express = require('express');
const router = express.Router();



router.post('/', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const flashcard = new FlashCard({
            question: req.body.question,
            answer: req.body.answer,
            category: req.body.category,
        });

        await flashcard.save();
     
        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


router.get('/', async (req, res) => {
    try {
        const flashcard = await FlashCard.find();
        return res.send(flashcard);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const flashcard = await FlashCard.findById(req.params.id);

        if (!flashcard)
            return res.status(400).send(`The product with id "${req.params.id}" does not exsist.`);

            return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } =validate(req.body);
        if (error) return res.status(400).send(error);

        const flashcard = await FlashCard.findByIdAndUpdate(
            req.params.id,
            {
                question: req.body.question,
                answer: req.body.answer,
                category: req.body.category,
                // price: req.body.price,
            },
            { new: true }
        );

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
      
        const flashcard = await FlashCard.findByIdAndRemove(req.params.id);

        if (!product)
            return res.status(400).send(`The product with id "${res.params.id}" does not exist.`);

            return res.send(flashcard);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
module.exports = router;
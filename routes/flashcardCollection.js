const { Flashcard , validate } = require('../model/Flashcard');
const express = require('express');
const router = express.Router();
const {Deck} = require('../model/Deck');
//change route
router.post('/:id/cards', async (req, res) => {
    try{
        const deck = await Deck.findById(req.params.id);
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const flashcard = new Flashcard({
            question: req.body.question,
            answer: req.body.answer,
        });
        deck.cards.push(flashcard);

        await deck.save();
     
        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/', async (req, res) => {
    try{

        const deck = new Deck({
            category: req.body.category,
            cards: [],
        });

        await deck.save();
     
        return res.send(deck);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//gets entire database
router.get('/', async (req, res) => {
    try {
        const flashcard = await Flashcard.find();
        return res.send(flashcard);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const flashcard = await Deck.findById(req.params.id);

        if (!flashcard)
            return res.status(400).send(`The deck with id "${req.params.id}" does not exsist.`);

            return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:collectionId/cards/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);

        if (error) return res.status(400).send(error);
            const deck = await Deck.findById(req.params.collectionId);

    if (!deck) return res.status(400).send(`The deck with id "${req.params.collectionId}" does not exist.`);
        const card = deck.cards.id(req.params.id);

    if (!card) return res.status(400).send(`The card with id "${req.params.id}" does not exist.`);
        card.question = req.body.question;
        card.answer = req.body.answer;
        
        await deck.save();
        return res.send(cards);
      } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`); }
    });

router.put('/:id', async (req, res) => {
    try {
        const { error } =validate(req.body);
        if (error) return res.status(400).send(error);

        const flashcard = await Flashcard.findByIdAndUpdate(
            req.params.id,
            {
                question: req.body.question,
                answer: req.body.answer,
            },
            { new: true }
        );

        if (!flashcard)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

            await flashcard.save();

            return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/id', async (req, res) => {
    try {
      
        const flashcard = await Flashcard.findByIdAndRemove(req.params.id);

        if (!product)
            return res.status(400).send(`The product with id "${res.params.id}" does not exist.`);

            return res.send(flashcard);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
module.exports = router;
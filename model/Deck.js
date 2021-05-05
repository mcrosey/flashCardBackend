const mongoose = require('mongoose');
const Joi = require('joi');
const Flashcard = require('./Flashcard');

const deckSchema = mongoose.Schema({
    category: { type: String, required: true },
    cards: {type :[Flashcard.schema] },
});

const Deck = mongoose.model('Deck', deckSchema);

function validateDeck(deck) {
    const schema = Joi.object({
        category: Joi.string().min(2).max(50).required(),
    });
    return schema.validate(deck); 
}

exports.Deck = Deck;
exports.validate = validateDeck;
exports.deckSchema = deckSchema;
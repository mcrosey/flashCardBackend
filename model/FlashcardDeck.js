const mongoose = require('mongoose');
const Joi = require('joi');
const flashcardSchema = require('./FlashCard');

const flashcardDeckSchema = new mongoose.Schema({
    category: { type: String, required: true, minlength: 2, maxlength: 50 },
    cards: { type: [flashcardSchema], default: []}
});

const FlashCardDeck = mongoose.model('FlashcardDeck', flashcardDeckSchema);

function validateFlashcardDeck(flashcardDeck) {
    const schema = Joi.object({
        category: Joi.string().min(2).max(50).required(),
    });
    return schema.validate(flashcardDeck); 
}

exports.FlashCardDeck = FlashCardDeck;
exports.validate = validateFlashcardDeck;
exports.flashcardDeckSchema = flashcardDeckSchema;
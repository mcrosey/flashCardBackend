const mongoose = require('mongoose');
const Joi = require('joi');


const flashcardSchema = new mongoose.Schema({
    question: { type: String, required: true, minLength: 2, maxLength: 255 },
    answer: {type: String, required: true },
});

const FlashCard = mongoose.model('Flashcard', flashcardSchema);

function validateFlashcard(flashcard) {
    const schema = Joi.object({
        question: Joi.string().min(2).max(200).required(),
        answer: Joi.string().required(),
    });
    return schema.validate(flashcard); 
}

exports.FlashCard = FlashCard;
exports.validate = validateFlashcard;
exports.flashcardSchema = flashcardSchema;
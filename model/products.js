const mongoose = require('mongoose');
const Joi = require('joi');

const flashcardSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 255 },
    description: {type: String, required: true },
    category: { type: String, required: true, minlength: 5, maxlength: 50 },
    // price: { type: Number, required: true },
    // dateModified: { type: Date, default: Date.now },
});
//product gree, orange
const FlashCard = mongoose.model('Flashcard', flashcardSchema);
//product blue
function validateFlashcard(flashcard) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
        category: Joi.string().min(5).max(50).required(),
        // price: Joi.number().required(),
    });
    return schema.validate(flashcard); //product blue
}

exports.FlashCard = FlashCard;
exports.validate = validateFlashcard;
exports.flashcardSchema = flashcardSchema;

//green yellow blue
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const BooksSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    thumbnail: { type: String },
    published: { type: Date, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Books = (0, mongoose_1.model)('Books', BooksSchema);

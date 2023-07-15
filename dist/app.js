"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const index_1 = __importDefault(require("../src/app/routes/index"));
//create app
const app = (0, express_1.default)();
// use cors
app.use((0, cors_1.default)());
// json parser
app.use(express_1.default.json());
//cookie parser
app.use((0, cookie_parser_1.default)());
// url parser
app.use(express_1.default.urlencoded({ extended: true }));
//application route
app.use('/api/v1', index_1.default);
//home route
app.get('/', (req, res) => {
    res.send('Welcome to our application');
});
//global error handler
app.use(globalErrorHandler_1.default);
//handle not found route
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found',
            },
        ],
    });
    next();
});
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./src/route"));
require("dotenv").config();
const app = (0, express_1.default)();
const server = new http_1.default.Server(app);
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
const PORT = 8000;
app.use("/", route_1.default);
server.listen(PORT, () => {
    console.log(`servrt run on ${PORT}`);
});
//# sourceMappingURL=server.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.item.upsert({
            where: { id: 1 },
            update: {},
            create: {
                name: "chicken biriyani",
                price: 150,
                ingredients: ["jeerakashala ,chicken"],
            },
        });
        yield prisma.item.upsert({
            where: { id: 2 },
            update: {},
            create: {
                name: "beef biriyani",
                price: 150,
                ingredients: ["jeerakashala ,chicken"],
            },
        });
        yield prisma.item.upsert({
            update: {},
            create: {
                name: "chicken fry",
                price: 150,
                ingredients: ["chilly powder,chicken"],
            },
        });
        yield prisma.item.upsert({
            where: { id: 2 },
            update: {
            // name: "AptlyLab",
            // subscriptionStatus: true,
            // logoPath: "file/bin",
            // logoUrl1: "http://localhost",
            // logoUrl2: "http://localhost",
            },
            create: {
                name: "AptlyLab",
                logoImage: "http://localhost",
                bannerImage: "http://localhost:90923",
            },
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=itesm.seed.js.map
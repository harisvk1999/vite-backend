import Router from "express";
import isUser from "../../middleware/isUser";

import GetCartItems from "../../controller/orderCart/getCartItems";

const cartRouter = Router();

cartRouter.get("/get-cart-items", GetCartItems);

export default cartRouter;

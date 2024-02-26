import Router from "express";
import isUser from "../../middleware/isUser";

import { placeOrder } from "../../controller/placeOrder/place-order";
import { GetItem } from "../../controller/food/get-item";

const foodRouter = Router();

foodRouter.post("/palace-order", placeOrder);

foodRouter.get("/get-all-items", GetItem);

export default foodRouter;

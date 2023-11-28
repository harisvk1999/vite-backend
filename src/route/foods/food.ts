import Router from "express";
import isUser from "../../middleware/isUser";
import ListFoods from "../../controller/auth/foods/list-foods";

const foodRouter = Router();

foodRouter.get("/list-foods", isUser, ListFoods);

export default foodRouter;

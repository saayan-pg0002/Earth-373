import express, { Request, Response, Router } from "express";
import Restaurant from "./model";

const router: Router = express.Router();

router.route("/").get((req: Request, res: Response) => {
  Restaurant.find()
    .then((restaurants) => res.json(restaurants))
    .catch((err) => res.status(400).json("Error: " + err));
  console.log(Restaurant);
});

router.route("/add").post((req: Request, res: Response) => {
  const name = req.body.name;
  const cuisine = req.body.cuisine;
  const restaurant_id = req.body.restaurant_id;

  const newRestaurant = new Restaurant({
    name,
    cuisine,
    restaurant_id,
  });

  newRestaurant
    .save()
    .then(() => res.json("New Restaurant"))
    .catch((err) => res.status(400).json("Error: " + err));
});

export default router;

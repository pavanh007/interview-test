import { Router } from 'express';
import {
  getCustomers,
  getCustomersById,
  getAllUniqueCities,
  createCustomers,
} from "./Controller/userController.js";

const router = Router();

router.route("/").get(getCustomers).post(createCustomers);
router.route("/cities").get(getAllUniqueCities);
router.route("/:id").get(getCustomersById);

export default router;

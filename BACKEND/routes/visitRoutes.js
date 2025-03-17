// import express from "express";
// import { getTotalVisits, trackVisit } from "../controllers/visitController.js";

// const router = express.Router();

// router.get("/total-visits", getTotalVisits);
// router.post("/track-visit", trackVisit);

// export default router;

import express from "express";
import {
  getVisitCount,
  updateVisitCount,
} from "../controllers/visitController.js";

const router = express.Router();

router.get("/visit-count", getVisitCount);
router.post("/update-visit", updateVisitCount);

export default router;

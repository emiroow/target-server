import express from "express";

const router = express.Router();

router.route("/test").get((req: express.Request, res: express.Response) => {
  res.json({ test: "test" });
});

export default router;

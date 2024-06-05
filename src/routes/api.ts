import { Request, Response, Router } from "express";

const router: Router = Router();

// route.route("/test").get((req: any, res: any) => {
//   res.json({ test: "test" });
// });

router.get("/test", (req: Request, res: Response) => {
  console.log(req);
  res.json("hello");
});

export default router;

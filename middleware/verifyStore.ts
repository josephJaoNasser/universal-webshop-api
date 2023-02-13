import { Request, Response, NextFunction } from "express";
import getStoreInfo from "@/lib/getStoreInfo";

/**
 *  @description verify and get store data that's sent with the request. The store info is stored in req["store_info"]
 */
function verifyStore(req: Request, res: Response, next: NextFunction) {
  const token = (req.headers.authorization?.replace("Bearer ", "") ||
    req.query.token) as string;

  getStoreInfo({ id: req.params.storeId, token })
    .then((storeInfo) => {
      console.log({
        token,
        storeInfoToken: storeInfo.token,
        qtoken: req.query.token,
        authHeader: req.headers.authorization,
      });
      if (token !== storeInfo.token) {
        return res
          .status(403)
          .send("You are not allowed to access this store's data.");
      }

      req["store_info"] = storeInfo;

      next();
    })
    .catch((err) => {
      console.error({ err });
      return res.status(404).send("Store not found");
    });
}

export default verifyStore;

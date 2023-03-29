import { Request, Response, NextFunction } from "express";
import getStoreInfo from "@/lib/helpers/getStoreInfo";

/**
 *  @description verify and get store data that's sent with the request. The store info is stored in req["store_info"]
 */
function verifyStore(req: Request, res: Response, next: NextFunction) {
  getStoreInfo({ id: req.params.storeId })
    .then((storeInfo) => {
      req["store_info"] = storeInfo;

      next();
    })
    .catch((err) => {
      console.error({ err });
      return res.status(404).send("Store not found");
    });
}

export default verifyStore;

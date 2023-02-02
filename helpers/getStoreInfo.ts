import { Request, Response, NextFunction } from "express";

/**
 * @description get store data from database. The stored in req["store_info"]
 */
function getStoreInfo(req: Request, res: Response, next: NextFunction) {
  if (!req.body?.credentials) {
    return res.status(403).send("No credentials provided");
  }

  //fetch from db
  const storeInfo: StoreInfo = {
    id: 1,
    storeId: req.params.storeId,
    source: "ecwid",
  };

  req["store_info"] = storeInfo;

  next();
}

export default getStoreInfo;

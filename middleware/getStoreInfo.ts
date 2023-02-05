import { Request, Response, NextFunction } from "express";

/**
 * @description get store data from database. The stored in req["store_info"]
 */
function getStoreInfo(req: Request, res: Response, next: NextFunction) {
  /*** fetch from db (remove this code block when actually fetching from the database) ***/
  const storeInfo: StoreInfo = {
    id: 1,
    storeId: process.env.ECWID_STORE_ID,
    source: "ecwid",
    token: "asd123456xyz",
    credentials: {
      token: process.env.ECWID_TOKEN as string,
    },
  };

  if (storeInfo.id != req.params.storeId) {
    return res.status(404).send("Store ID not found");
  }

  const token = req.headers.authorization?.replace("Bearer ", "");

  if (token !== storeInfo.token) {
    return res
      .status(403)
      .send("You are not allowed to access this store's data.");
  }

  /***** remove END ****/

  req["store_info"] = storeInfo;

  next();
}

export default getStoreInfo;

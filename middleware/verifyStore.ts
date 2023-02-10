import { Request, Response, NextFunction } from "express";
import getStoreInfo from "@/lib/getStoreInfo";

/**
<<<<<<< HEAD
 * @description verify and get store data that's sent with the request. The store info is stored in req["store_info"]
=======
 * @description get store data from database. The store info is stored in req["store_info"]
>>>>>>> dfb36dc5ad06873dde78d7b64d21f4c2b0778c65
 */
function verifyStore(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  getStoreInfo(req.params.storeId, token)
    .then((storeInfo) => {
      if (token !== storeInfo.token) {
        return res
          .status(403)
          .send("You are not allowed to access this store's data.");
      }

      req["store_info"] = storeInfo;

      next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).send("Store not found");
    });
}

export default verifyStore;

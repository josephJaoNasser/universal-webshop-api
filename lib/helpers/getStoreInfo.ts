interface GetStoreParams {
  id?: string;
  storeId?: string;
  storeSource?: string;
}

export default async function getStoreInfo({
  id,
  storeId,
  storeSource,
}: GetStoreParams): Promise<StoreInfo> {
  /** Replace this with an API call, either find by id or find by store source + token */
  const storeInfo: StoreInfo = {
    id: 1,
    encryptedId: "asd123xyz",
    storeId: process.env.ECWID_STORE_ID,
    source: "ecwid",
    builder_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzgsImlhdCI6MTY3NjM2MzMyMiwiZXhwIjoxNjc4OTU1MzIyfQ.1yQYT8xrtMbDwT4vygXeCShLwgd94AD6lXwGd5wFkL4",
    credentials: {
      token: process.env.ECWID_TOKEN as string,
    },
    siteId: "456c4da0579ed36dd69fe5226cdf9ec3",
    locationPageIdSource: 18939,
  };

  /** change this condition, if !storeInfo */
  if (id != "asd123xyz") {
    throw new Error("Store does not exist");
  }

  return storeInfo;
}

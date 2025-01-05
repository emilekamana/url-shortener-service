import { ObjectId } from "mongodb";
import { nanoid } from "nanoid";

export default class ShortUrl {
  constructor(
    public originalUrl: string,
    public shortCode: string = nanoid(6),
    public clicks: number = 0,
    public createdAt: Date = new Date(),
    public _id?: ObjectId
  ) {}
}

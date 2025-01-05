import { ObjectId } from "mongodb";
import { nanoid } from "nanoid";

export default class ShortUrl {
    constructor(public originalUrl: string, public shortCode: string=nanoid(6), public clicks?: Number, public createdAt: Date = new Date(), public id?: ObjectId) {}
}

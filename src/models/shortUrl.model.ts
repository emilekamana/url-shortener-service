import { ObjectId } from "mongodb";
import { nanoid } from "nanoid";

export default class ShortUrl {
  /**
   * Represents a shortened URL.
   * @constructor
   * @param {string} originalUrl The original URL.
   * @param {string} [shortCode=nanoid(6)] The short code for the URL.
   * @param {number} [clicks=0] The number of times the URL has been clicked.
   * @param {Date} [createdAt=new Date()] The date the URL was created.
   * @param {ObjectId} [_id] The ID of the document.
   */
  constructor(
    public originalUrl: string,
    public shortCode: string = nanoid(6),
    public clicks: number = 0,
    public createdAt: Date = new Date(),
    public _id?: ObjectId
  ) {}
}

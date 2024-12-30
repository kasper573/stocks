import { IRestClient } from "@polygon.io/client-js";
import { PriceType } from "../fixtures/priceType";
import { ISODateSpan } from "./types";

export async function fetchPriceSpan(
  polygon: IRestClient,
  ticker: string,
  date: ISODateSpan,
  priceType: PriceType,
): Promise<PriceSpan> {
  try {
    const [from, to] = await Promise.all(
      [date.from, date.to].map((isoDate) =>
        polygon.stocks.dailyOpenClose(ticker, isoDate).then((result) => {
          const price = result[priceType];
          if (price === undefined) {
            throw new Error("Price not found");
          }
          return typeof price === "number" ? price : parseFloat(price);
        }),
      ),
    );
    return { from, to };
  } catch (error) {
    if (String(error) === "Error") {
      throw new Error("An unknown error occurred. Possibly rate limit.");
    }
    throw error;
  }
}

export interface PriceSpan {
  from: number;
  to: number;
}

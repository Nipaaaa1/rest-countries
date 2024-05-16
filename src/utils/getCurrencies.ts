import { DetailedCountry } from "./types";

export default function getCurrencies(data: DetailedCountry) {
  let result: string[] = [];
  if (data.currencies) {
    Object.keys(data.currencies).forEach((key) => {
      result.push(data.currencies[key].name);
    });
  }
  return result;
}

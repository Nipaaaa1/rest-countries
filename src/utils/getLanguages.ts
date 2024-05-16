import { DetailedCountry } from "./types";

export default function getLanguages(data: DetailedCountry) {
  let result: string[] = [];
  if (data.languages) {
    Object.entries(data.languages).forEach(([_, value]) => {
      result.push(value);
    });
  }
  return result;
}

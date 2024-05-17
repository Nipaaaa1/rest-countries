import { DetailedCountry } from "./types";

export default function getNativeName(data: DetailedCountry) {
  let result: string[] = [];
  if (data.name.nativeName) {
    Object.keys(data.name.nativeName).forEach((key) => {
      result.push(data.name.nativeName[key].common);
    });
  }
  return result;
}

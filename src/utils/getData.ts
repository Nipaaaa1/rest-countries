import { Country } from "./types";
import axios from "axios";

export const getData = async (url: string, setData: any) => {
  try {
    const response = await axios.get<Country[]>(url);
    setData(response.data);
  } catch (error) {
    console.error(error);
  }
};

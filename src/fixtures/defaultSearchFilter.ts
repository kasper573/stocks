import { SearchFilter } from "../components/SearchForm";

export const defaultSearchFilter: SearchFilter = {
  apiKey: import.meta.env.VITE_POLY_API_KEY ?? "",
  ticker: "NVDA",
  notify: {
    percentage: 5,
    type: "both",
  },
  marketDays: 5,
  targetDate: "yesterday",
  price: "close",
};

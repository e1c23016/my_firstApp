import { useEffect, useState } from "react";
import type { Range } from "../types";
import { fetchBudgets, type Budget } from "../apis/getBudgets";
import { fetchGenres, type Genre } from "../apis/getGenres";

export function useSearchForm() {
  const [range, setRange] = useState<Range>(3);
  const [genre, setGenre] = useState<string>(""); // 未選択は ""
  const [budget, setBudget] = useState<string>(""); // 未選択は ""

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const budgetList = await fetchBudgets();
        const genreList = await fetchGenres();
        // console.log("budgets:", budgetList);
        // console.log("genres:", genreList);
        setBudgets(budgetList);
        setGenres(genreList);
        // console.log("budgets state:", budgets);
        // console.log("genres state:", genres);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return {
    range,
    setRange,
    genre,
    setGenre,
    budget,
    setBudget,
    budgets,
    genres,
  };
}

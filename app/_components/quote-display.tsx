"use client";

import { useEffect, useState } from "react";
import { setStoredValue } from "@/lib/utils";

type QuoteType = {
  content: string;
  author: string;
};

export function QuoteDisplay() {
  const [quote, setQuote] = useState<QuoteType | null>(null);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        const newQuote = {
          content: data.content,
          author: data.author,
          fetchedAt: new Date().toDateString(),
        };
        setQuote(newQuote);
        setStoredValue("dailyPlannerQuote", newQuote);
      } catch (error) {
        console.error("Error fetching quote:", error);
        // idk why I cant fetch any quotes from this api so just return a static data
        const fallbackQuote = {
          content:
            "The best preparation for tomorrow is doing your best today.",
          author: "H. Jackson Brown Jr.",
        };
        setQuote(fallbackQuote);
        setStoredValue("dailyPlannerQuote", fallbackQuote);
      }
    }

    fetchQuote();
  }, []);

  if (!quote) return null;

  return (
    <div className="flex bg-muted rounded-lg m-5 p-5">
      <p className="italic font-bold">{`"${quote.content}"`}</p>
      <span className="text-muted-foreground mx-2 pl-5">— {quote.author}</span>
    </div>
  );
}

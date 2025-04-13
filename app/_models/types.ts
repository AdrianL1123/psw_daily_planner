export type TasksType = {
  [date: string]: {
    [hour: string]: string;
  };
};

export type QuoteType = {
  content: string;
  author: string;
  fetchedAt?: string;
};

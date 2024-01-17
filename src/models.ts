export type Movie = {
  original_title: string;
  overview: string;
  title: string;
};

export type MovieResponse = {
  data: {
    movies: {
      page: number;
      results: Movie[];
      total_pages: number;
      total_results: number;
    };
    notification: boolean;
  };
};

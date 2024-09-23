import { domain } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";
import { Article } from "@prisma/client";

export async function getArticle(
  pageNumber: string | undefined
): Promise<Article[]> {
  const response = await fetch(
    `${domain}/api/articles?pageNumber=${pageNumber}`,
    { cache: 'no-store'}
  );

  if (!response.ok) {
    throw new Error("Faild to fetch articles");
  }

  return response.json();
}

export async function getArticleCount(): Promise<number> {
  const response = await fetch(`${domain}/api/articles/count`, { cache: 'no-store'});

  if (!response.ok) {
    throw new Error("Faild to get articles count");
  }

  const { count } = (await response.json()) as { count: number };

  return count;
}

export async function getArticleBasedOnSearch(
  searchText: string
): Promise<Article[]> {
  const response = await fetch(
    `${domain}/api/articles/search?searchText=${searchText}`
  );

  if (!response.ok) {
    throw new Error("Faild to fetch articles");
  }

  return response.json();
}

export async function getSingleArticle(articleId: string): Promise<SingleArticle> {
  const response = await fetch(
    `${domain}/api/articles/${articleId}`, {
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error("Faild to fetch article");
  }

  return response.json();
}

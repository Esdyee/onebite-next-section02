import { BookItemProps } from "@/types/book.type";

// 추천하는 도서로 사용
export default async function fetchRandomBooks(): Promise<BookItemProps[]> {
  const url = "http://localhost:12345/book/random";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

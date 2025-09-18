import BookItem from "@/components/search/book-item";
import SearchableLayout from "@/components/search/searchable-layout";
import styles from "@/pages/index.module.css";
import books from "@/mock/books.json";
import { BookItemProps } from "@/types/book.type";

export default function Home() {
  const bookList = books;
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {bookList.map((book: BookItemProps) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
      </section>
    </div>
  );
}

// getLayout이라고 적었지만 명칭은 바꿔도 상관없음.
Home.getLayoutOneBite = function getLayout(page: React.ReactNode) {
  return <SearchableLayout>{page}</SearchableLayout>;
}
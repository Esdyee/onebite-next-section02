import BookItem from "@/components/search/book-item";
import SearchableLayout from "@/components/search/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import styles from "@/pages/index.module.css";
import { BookItemProps } from "@/types/book.type";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";

export const getStaticProps = async () => {
  const allBooks = await fetchBooks("");
  const randomBooks = await fetchRandomBooks();
  return {
    props: { allBooks, randomBooks },
  };
};

// 이렇게 data props를 받아올 수 있음.
export default function Home(
  props: InferGetServerSidePropsType<typeof getStaticProps>
) {
  // const bookList = books;
  return (
    <>
      <Head>
        <title>한입 북스</title>
        <meta name="description" content="ONEBITE BOOK" />
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 북스" />
        <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
      </Head>
      <div className={styles.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {props.randomBooks.map((book: BookItemProps) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {props.allBooks.map((book: BookItemProps) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

// getLayout이라고 적었지만 명칭은 바꿔도 상관없음.
Home.getLayoutOneBite = function getLayout(page: React.ReactNode) {
  return <SearchableLayout>{page}</SearchableLayout>;
};

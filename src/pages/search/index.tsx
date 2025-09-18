import BookItem from "@/components/search/book-item";
import SearchableLayout from "@/components/search/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import { BookItemProps } from "@/types/book.type";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// context는 현재 요청에 대한 정보를 담고 있음
// ex) 요청 경로, 요청 파라미터, 요청 헤더 등
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const searchBooks = await fetchBooks(context.query.q as string);
  return {
    props: {
      searchBooks,
    },
  };
};

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const bookList = props.searchBooks;
  return (
    <div>
      {bookList.map((book: BookItemProps) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayoutOneBite = function getLayout(page: React.ReactNode) {
  return <SearchableLayout>{page}</SearchableLayout>;
}
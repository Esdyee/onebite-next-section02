import BookItem from "@/components/search/book-item";
import SearchableLayout from "@/components/search/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import { BookItemProps } from "@/types/book.type";
// import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// context는 현재 요청에 대한 정보를 담고 있음
// ex) 요청 경로, 요청 파라미터, 요청 헤더 등
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q; // build 타임에서는 query 객체가 없음.
//   const searchBooks = await fetchBooks(q as string);
//   return {
//     props: {
//       searchBooks,
//     },
//   };
// };

export default function Page() {
  const router = useRouter();
  const { q } = router.query;
  const [searchBooks, setSearchBooks] = useState<BookItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSearchBooks = async () => {
      const searchBooks = await fetchBooks(q as string);
      setLoading(false); // 데이터 로딩이 완료되면 loading을 false로 변경
      setSearchBooks(searchBooks);
    }
    fetchSearchBooks();
  }, [q, loading]);

  const bookList = searchBooks;
  return (
    <div>
      {loading ? <div>Loading...</div> : (
        bookList.length > 0 ? bookList.map((book: BookItemProps) => (
          <BookItem key={book.id} {...book} />
        ))
          : <div>검색 결과가 없습니다.</div>
      )
    }
    </div>
  );
}

Page.getLayoutOneBite = function getLayout(page: React.ReactNode) {
  return <SearchableLayout>{page}</SearchableLayout>;
}
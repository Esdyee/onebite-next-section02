import fetchOneBook from "@/lib/fetch-one-book";
import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import styles from "./[id].module.css";
import { useRouter } from "next/router";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const id = context.params!.id;
//   const book = await fetchOneBook(Number(id));
//   return {
//     props: {
//       book,
//     },
//   };
// };

export const getStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

export const getStaticPaths = async () => {
  // const books = await fetchBooks();
  return {
    paths: [
      { params: { id: "1" } }, // id는 무조건 string 타입이어야 함(Next.js의 규칙)
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true, // false면 위에 있는 paths에 없는 페이지는 404 페이지를 반환
  };
};

export default function Page(
  props: InferGetServerSidePropsType<typeof getStaticProps>
) {
  const book = props.book;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // book이 없는 경우는 이제 getStaticProps에서 처리되므로 여기서는 필요 없음
  // 만약 여전히 체크가 필요하다면 아래와 같이 처리
  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.cover_img_container}
        style={{ backgroundImage: `url('${book.coverImgUrl}')` }}
      >
        <Image
          src={book.coverImgUrl}
          alt={book.title}
          width={350}
          height={100}
        />
      </div>
      <div className={styles.title}>{book.title}</div>
      <div className={styles.subTitle}>{book.subTitle}</div>
      <div className={styles.description}>{book.description}</div>
      <div className={styles.author}>
        {book.author} | {book.publisher}
      </div>
    </div>
  );
}

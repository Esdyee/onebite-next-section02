import Image from "next/image";
import styles from "./[id].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-book";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  return {
    props: {
      book,
    },
  };
};

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const book = props.book;

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

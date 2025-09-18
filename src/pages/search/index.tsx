import BookItem from "@/components/search/book-item";
import SearchableLayout from "@/components/search/searchable-layout";
// import { useRouter } from "next/navigation"; // app router에서는 next/navigation
import books from "@/mock/books.json";
import { BookItemProps } from "@/types/book.type";

export default function Page() {
  const bookList = books;
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
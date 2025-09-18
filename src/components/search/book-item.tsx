import Image from "next/image";
import type { BookItemProps } from "@/types/book.type";
import Link from "next/link";
import styles from "./book-item.module.css";

export default function BookItem(item: BookItemProps) {
  return (
    <Link href={`/book/${item.id}`} className={styles.container}>
      {/* width:는 80px height는 100%로 설정 */}
      <Image src={item.coverImgUrl} alt={item.title} width={80} height={100} />
      <div>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.subTitle}>{item.subTitle}</p>
        <p className={styles.author}>
          {item.author} | {item.publisher}
        </p>
      </div>
    </Link>
  );
}

import Link from "next/link";
import styles from "@/components/global-layout.module.css";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
});

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.container} ${notoSansKr.className}`}>
      <header className={styles.header}>
        <Link href="/">📚 ONEBITE BOOK</Link>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>제작 Esdyee</footer>
    </div>
  );
}

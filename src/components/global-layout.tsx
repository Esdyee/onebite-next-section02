import Link from "next/link";
import styles from "@/components/global-layout.module.css";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">📚 ONEBITE BOOK</Link>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>제작 Esdyee</footer>
    </div>
  );
}

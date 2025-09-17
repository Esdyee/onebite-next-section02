export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>헤더</header>
      <main>{children}</main>
      <footer>푸터</footer>
    </>
  );
}

import Head from "next/head";

interface MetaHeadProps {
  title?: string;
  description?: string;
  image?: string;
}

export default function MetaHead({
  title = "한입 북스",
  description = "한입 북스에 등록된 도서들을 만나보세요",
  image = "/thumbnail.png"
}: MetaHeadProps) {
  const fullTitle = title === "한입 북스" ? title : `${title} - 한입 북스`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
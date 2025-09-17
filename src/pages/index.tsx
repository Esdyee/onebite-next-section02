import SearchableLayout from "@/components/search/searchable-layout";

export default function Home() {
  return (
    <>
      <div>Index</div>
    </>
  );
}

// getLayout이라고 적었지만 명칭은 바꿔도 상관없음.
Home.getLayoutOneBite = function getLayout(page: React.ReactNode) {
  return <SearchableLayout>{page}</SearchableLayout>;
}
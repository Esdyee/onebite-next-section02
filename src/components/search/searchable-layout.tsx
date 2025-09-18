import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/components/search/searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q;

  // refresh 될 때 query 파라미터에 값이 있으면 그 값을 가져옴.
  useEffect(() => {
    if (q) {
      setSearch(q as string);
    }
  }, [q]);

  // React.ChangeEvent의 의미 : input 태그의 값이 변경되었을 때 이벤트 핸들러를 호출하는 타입
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <div className={styles.searchbar_container}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" onClick={handleSubmit}>
          검색
        </button>
      </div>
      {children}
    </div>
  );
}

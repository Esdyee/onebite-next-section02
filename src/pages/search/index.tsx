import { useRouter } from "next/router"; // page router에서는 next/router
// import { useRouter } from "next/navigation"; // app router에서는 next/navigation

export default function Page() {
  const router = useRouter();
  const query = router.query;
  return <h1>Search {query.q}</h1>;
}
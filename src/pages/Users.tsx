import { useSearchParams } from "react-router";
import FetchUsers from "../components/FetchUsers";

export default function Users() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";

  return (
    <div>
      <h1>검색어: {search}</h1>
      <input
        value={search}
        onChange={(e) => {
          setSearchParams({ search: e.target.value });
        }}
      />

      <FetchUsers search={search} />
    </div>
  );
}

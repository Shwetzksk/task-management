import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import "@/styles/SearchBar.css";
import { useStore } from "@/tasks-store";

function SearchBar() {
  const { onSearch, search } = useStore();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    onSearch(value);
  }
  return (
    <div className="search-bar">
      <IoSearchOutline className="icon" />
      <input
        placeholder="Search To-Do"
        onChange={handleChange}
        value={search}
      />
    </div>
  );
}

export default SearchBar;

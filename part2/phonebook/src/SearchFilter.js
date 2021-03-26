import React from "react";

const SearchFilter = ({ filter, handleFilterInput }) => {
  return (
    <div>
      <span>filter shown with</span>
      <input value={filter} onChange={handleFilterInput} />
    </div>
  );
};

export default SearchFilter;

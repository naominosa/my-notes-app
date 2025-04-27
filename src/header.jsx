import React from "react";

function Header({setSearch}) {
  return (
    <header>
      <div>
      <h1>Keepernote</h1>

      </div>
      
      <div>
      <input 
      // onClick={handleSearch}
       onChange={(e) => setSearch(e.target.value)}
       className="search-icon"
      type="search"
      placeholder="Search..."
       />

      </div>

    </header>

    
  );
}

export default Header;
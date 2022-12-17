import React from "react";

export default function Search() {
  return (
      <form className="form-inline search-form open">
        <div className="form-group">
          <input
            className="form-control-plaintext"
            type="search"
            placeholder="Search.."
          />
          <div className="icon-close close-search"> </div>
        </div>
      </form>
  );
}

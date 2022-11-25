import React from "react";

export default function Search() {
  return (
      <form class="form-inline search-form open">
        <div class="form-group">
          <input
            class="form-control-plaintext"
            type="search"
            placeholder="Search.."
          />
          <div class="icon-close close-search"> </div>
        </div>
      </form>
  );
}

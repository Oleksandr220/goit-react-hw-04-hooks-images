import { useState } from "react";

export default function Searchbar({ requestSubmit }) {
  const [request, setRequest] = useState("");

  const handleNameChange = (event) => {
    setRequest(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (request.trim() === "") {
      // toast('Please add  Request.');
      return;
    }

    requestSubmit(request);
    setRequest("");
  };

  return (
    <div>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            value={request}
            onChange={handleNameChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
}

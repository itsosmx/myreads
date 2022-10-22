import React, { useRef, useState } from 'react'
import { search } from '../BooksAPI';

export default function Search({ showSearchPage, setShowSearchPage, setStorage, storage }) {
  const [searchResult, setSearchResult] = useState([])
  const [query, setQuery] = useState([])


  const onChangeShelf = (item, e) => {
    const moveTo = e.target.value;
    const currentStorage = [...storage];
    const newStorage = currentStorage.map(shelf => {
      if (shelf.id === moveTo) return { ...shelf, books: [...shelf.books, item] }
      return shelf;
    })
    setStorage(newStorage)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await search(query, "10");
    if (response?.length) setSearchResult(response);
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a
          className="close-search"
          onClick={() => setShowSearchPage(!showSearchPage)}
        >
          Close
        </a>
        <form className="search-books-input-wrapper" onSubmit={onSubmit}>
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            value={query}
            placeholder="Search by title, author, or ISBN than click Enter!"
          />
        </form>
      </div>
      {searchResult?.length != 0 ? <div className="search-books-results">
        <ol className="books-grid">
          {
            searchResult?.map((item, idx) =>
              <li key={idx}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                          `url('${item?.imageLinks?.thumbnail}')`,
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select onChange={(e) => onChangeShelf(item, e)}>
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option value={0}>
                          Currently Reading
                        </option>
                        <option value={1}>Want to Read</option>
                        <option value={2}>Read</option>
                        <option value={3}>None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{item?.title}</div>
                  <div className="book-authors">{item?.authors[0]}</div>
                </div>
              </li>
            )
          }
        </ol>

      </div> : <div className="search-books-results" style={{ textAlign: "center" }}>No result found!</div>}
    </div>
  )
}

import React from 'react'

export default function Home({ storage, setStorage }) {

  const onChangeShelf = (item, e, id) => {
    const moveTo = e.target.value;
    const currentStorage = [...storage];
    const newStorage = currentStorage.map(shelf => {
      if (shelf.id === id) return { ...shelf, books: shelf.books.filter(book => book.id !== item.id) }
      if (shelf.id === moveTo) return { ...shelf, books: [...shelf.books, item] }
      return shelf;
    })
    setStorage(newStorage)
  }

  return (
    <article className='books_container'>
      {
        storage.map((prop, index) =>
          <div className='bookshelf' key={index}>
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className='bookshelf-books'>
              <ol className="books-grid">
                {
                  prop?.books.map((item, idx) =>
                    <li key={idx}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                `url('${item.imageLinks.thumbnail}')`,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select onChange={(e) => onChangeShelf(item, e, prop.id)} >
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
                        <div className="book-title">{item.title}</div>
                        <div className="book-authors">{item.authors[0]}</div>
                      </div>
                    </li>
                  )
                }
              </ol>
            </div>
          </div>)
      }
    </article>
  )
}

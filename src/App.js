import "./App.css";
import { useEffect, useState } from "react";
import { Home } from "./routes";
import { Header, Search } from "./components";
import { getAll } from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [storage, setStorage] = useState([])

  useEffect(() => {
    (async () => {
      const localStorage = window.localStorage.getItem('storage');
      if (localStorage) return setStorage(JSON.parse(localStorage))
      const response = await getAll();
      setStorage([{
        title: "Current Reading",
        id: "0",
        books: [response[0], response[1], response[2]],
      }, {
        title: "Want to Read",
        id: "1",
        books: [response[5], response[6]],
      }, {
        title: "Read",
        id: "2",
        books: [response[3], response[4]],
      }])
    })()
  }, [])

  useEffect(() => {
    window.localStorage.setItem("storage", JSON.stringify(storage));
  }, [storage])


  return (
    <div className="app">
      {showSearchPage ? <Search storage={storage} setStorage={setStorage} showSearchPage={showSearchPage} setShowSearchPage={setShowSearchPage} /> : <><Header /><Home storage={storage} setStorage={setStorage} /></>}
      <div className="open-search">
        <a onClick={() => setShowSearchPage(!showSearchPage)}>Add a book</a>
      </div>
    </div>
  );
}

export default App;

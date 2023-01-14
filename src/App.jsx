import { useState, useEffect } from "react";
import "./App.css";
import useFetchBlogs from "./hooks/useFetchBlogs";
import FetchTransactionId from "./hooks/FetchTransactionId";

function App() {
  // handle state of query, and pageNumber for graphQL request
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  // Grab transactionID from aarweave Original-Content-Digest OR we can go by contributor using their eth address
  const FetchTransactionId = () => {};
  // Using that transactionID you're able to pull that post's content from graphQL endpoint
  const { blogs, setBlogs } = useFetchBlogs();

  // Infinite loading everytime you press the button it loads 3 more blogs
  const handleLoadMore = (query, pageNumber) => {
    set;
  };

  return (
    <div className="App">
      {blogs.map((blog) => {
        return (
          <>
            <h1 key={blog.title}>{blog.title}</h1>
            <p key={blog.content}>{blog.content}</p>
          </>
        );
      })}
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
}

export default App;

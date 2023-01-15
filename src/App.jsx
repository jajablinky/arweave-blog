import { useState, useEffect } from "react";
import "./App.css";
import FetchTransactionId from "./hooks/FetchTransactionId";
import Arweave from "arweave";

const arweave = Arweave.init({});

function App() {
  // Grab transactionID for three blog posts using contributor eth address
  const { data, isLoading, error } = FetchTransactionId();

  // State management
  const [blogs, setBlogs] = useState([]);

  // Using those three transactionID from data in useFetchBlogs for fetching blog posts content and title
  useEffect(() => {
    if (!isLoading && !error && data) {
      const fetchBlogs = async () => {
        // Map over every id to assign in transaction Id array
        const transactionIds = data.data.transactions.edges.map(
          (edge) => edge.node.id
        );
        // Fetch the blogs using the transactionIds and arweave sdk
        const blogs = await Promise.all(
          transactionIds.map(async (transactionId) => {
            try {
              const data = await arweave.transactions.getData(transactionId, {
                decode: true,
                string: true,
              });
              return JSON.parse(data);
            } catch (error) {
              // handle the error
            }
          })
        );
        setBlogs(blogs);
        console.log(blogs);
      };
      fetchBlogs();
    }
  }, [data, isLoading, error]);

  // Infinite loading everytime you press the button it loads 3 more blogs
  // const handleLoadMore = (query, pageNumber) => {};

  return (
    <div className="App">
      {blogs.map((blog) => {
        return (
          <div key={blog.digest}>
            <h1>{blog.content.title}</h1>
            <h2>{blog.authorship.contributor}</h2>
            <p>{blog.content.body}</p>
          </div>
        );
      })}
      <button>Load More</button>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import FetchTransactionId from "./hooks/FetchTransactionId";
import Arweave from "arweave";
import ReactMarkdown from "react-markdown";
import moment from "moment";

const arweave = Arweave.init({});

function App() {
  // State
  const [blogs, setBlogs] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Grab transactionID for three blog posts using contributor eth address
  const { data, isLoading, error, refetch } = FetchTransactionId({ cursor });

  // Using those three transactionID from data in useFetchBlogs for fetching blog posts content and title
  useEffect(() => {
    if (!isLoading && !error && data) {
      const fetchBlogs = async () => {
        // Map over every id to assign in transaction Id array
        setCursor(data?.data?.transactions?.edges[0].cursor);
        const transactionIds = data?.data?.transactions?.edges.map(
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
  const fetchNextPage = () => {
    refetch({ cursor: cursor });
  };

  return (
    <div className="App">
      {blogs.map((blog) => {
        return (
          <div key={blog.digest}>
            <h1>{blog.content.title}</h1>
            <h2>{blog.authorship.contributor}</h2>
            <ReactMarkdown children={blog.content.body} />
            <span>
              <b>{moment(moment.unix(blog.content.timestamp)).fromNow()}</b>
            </span>
          </div>
        );
      })}
      {data && data.data ? (
        <button onClick={fetchNextPage}>Load More</button>
      ) : null}
    </div>
  );
}

export default App;

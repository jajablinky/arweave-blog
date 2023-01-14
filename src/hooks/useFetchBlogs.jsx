import React, { useEffect, useState } from "react";

const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState([
    { title: "blog1", content: "this is a bunch of content" },
    { title: "blog2", content: "this is a bunch of content" },
    { title: "blog3", content: "this is a bunch of content" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      setBlogs(data);
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  }, [query, pageNumber]);

  return { blogs, setBlogs };
};

export default useFetchBlogs;

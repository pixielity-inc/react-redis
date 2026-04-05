import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import PostsListPage from "@/pages/posts/list";
import PostsShowPage from "@/pages/posts/show";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<PostsListPage />} path="/posts" />
      <Route element={<PostsShowPage />} path="/posts/:id" />
    </Routes>
  );
}

export default App;

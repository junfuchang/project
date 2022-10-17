import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import AddArticle from "./views/AddArticle";
import ArticleList from "./views/ArticleList";
import BlogConfig from "./views/BlogConfig";
import Home from "./views/Home";
import Login from "./views/Login";
import UserList from "./views/UserList";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />}>
            <Route index element={<ArticleList />}></Route>
            <Route path="ArticleList" element={<ArticleList />}></Route>
            <Route path="AddArticle" element={<AddArticle />}></Route>
            <Route path="BlogConfig" element={<BlogConfig />}></Route>
            <Route path="UserList" element={<UserList />}></Route>
            <Route path={"*"} element={<ArticleList />} />
          </Route>
          <Route path={"*"} element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

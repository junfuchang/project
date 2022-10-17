import { HomeOutlined } from "@ant-design/icons";
import { Affix, Breadcrumb, Col, Row } from "antd";
// import hljs from "highlight";
// import "highlight/lib/vendor/highlight.js/styles/dark.css";
import MarkNav from "markdown-navbar";
import { marked } from "marked";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Author from "../components/Author";
import Footer from "../components/Footer";
import Header from "../components/Header";
import detail from "../styles/detail.module.css";
import servicePath from "./api/servicePath";

//配置markdown解析器;
// const renderer = new marked.Render();
// marked.setOptions({
//   renderer: renderer,
//   gfm: true,
//   pedantic: false,
//   sanitize: false,
//   tables: true,
//   breaks: false,
//   smartLists: true,
//   smartypants: false,
//   highlight: function (code) {
//     return hljs.highlightAuto(code).value;
//   },
// });

export default function Detail({ content }) {
  let myContent = marked.parse(content.content ? content.content : "无内容~");

  return (
    <>
      <Head>
        <title>{content.title}</title>
      </Head>
      <Header />
      <div className="bread-div">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">
              <a>首页</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={{ pathname: "/list", query: { id: content.typeId } }}>
              {content.typeName}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{content.title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className={detail["detail-title"]}>{content.title}</div>
            <div
              style={{ textAlign: "center" }}
              className={detail["detail-icon"]}
            >
              <span>
                <HomeOutlined />
                {content.addTime
                  ? content.addTime
                  : new Date().toLocaleDateString()}
              </span>
              <span>
                <HomeOutlined />
                {content.typeName ? content.typeName : "default type"}
              </span>
              {/* <span>
                <HomeOutlined />{" "}
                {content.viewCount ? content.viewCount : "default viewCount"}
              </span> */}
            </div>
            <div className={detail["detail-content"]}>
              <div dangerouslySetInnerHTML={{ __html: myContent }}></div>
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Affix offsetTop={5} style={{ fontSize: "0.7rem" }}>
            <div className="detailed-nav">
              <div className="nav-title">文章目录</div>
              <MarkNav
                className="article-menu"
                source={content.content ? content.content : "无内容~"}
                ordered={false}
              />
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  const res = await fetch(servicePath.getArticleById + id);
  const res_json = await res.json();
  const content = res_json[0];
  return { props: { content } };
}

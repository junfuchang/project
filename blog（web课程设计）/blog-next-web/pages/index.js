import { HomeOutlined } from "@ant-design/icons";
import { Col, List, Row, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Author from "../components/Author";
import Footer from "../components/Footer";
import Header from "../components/Header";
import lists from "../styles/lists.module.css";
import servicePath from "./api/servicePath";

const { Paragraph } = Typography;

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>首页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <div className={lists["list-title"]}>
                    <Link
                      href={{ pathname: "/detail", query: { id: item.id } }}
                    >
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className={lists["list-icon"]}>
                    <span>
                      <HomeOutlined />
                      {item.addTime
                        ? item.addTime
                        : new Date().toLocaleDateString()}
                    </span>
                    <span>
                      <HomeOutlined />
                      {item.typeName ? item.typeName : "default type"}
                    </span>
                    {/* 由于中台的中间件未能实现，这里无法展示 */}
                    {/* <span>
                      <HomeOutlined />
                      {item.viewCount ? item.viewCount : "0"}
                    </span> */}
                  </div>
                  <Paragraph
                    className={lists["list-context"]}
                    ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
                  >
                    {item.introduce
                      ? item.introduce.length < 500
                        ? item.introduce
                        : item.introduce.subString(0, 300)
                      : "无简介~"}
                  </Paragraph>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const articleList = await fetch(servicePath.getArticleList);
  const data = await articleList.json();
  return { props: { data } };
}

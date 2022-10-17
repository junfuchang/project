import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, List, Row, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Author from "../components/Author";
import Footer from "../components/Footer";
import Header from "../components/Header";
import lists from "../styles/lists.module.css";
import servicePath from "./api/servicePath.js";

const { Paragraph } = Typography;

const Lists = ({ router }) => {
  const [mylist, setMylist] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(async () => {
    const id = router.query.id;
    const res = await fetch(servicePath.getListById + id);
    //获取到符合类别的数据
    const data = await res.json();
    setMylist(data);

    const articleTypes = await fetch(servicePath.getArticleTypes);
    let temp = await articleTypes.json();
    temp = temp.filter(item => item.id == router.query.id);
    setTypes(temp[0]["type_name"]);
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>{`分类：${types}`}</title>
      </Head>
      <Header />
      <div className="bread-div">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">
              <a>首页</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{types}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <List
              header={<div>{`分类：${types}`}</div>}
              itemLayout="vertical"
              dataSource={mylist}
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
};

export default withRouter(Lists);

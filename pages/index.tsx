import type { NextPage } from "next";
import Layout from "../src/layout/Layout";
import Main from "../src/layout/Main";

const Home: NextPage = () => {
  return (
    <Layout>
      <Main />
    </Layout>
  );
};

export default Home;

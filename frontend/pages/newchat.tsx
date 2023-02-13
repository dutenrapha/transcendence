import styles from "../styles/Home.module.css";
import Link from "next/link";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import Layout from "../components/layout";

interface Props {
  message: string
}

const Home: NextPageWithLayout = (props: Props) => {
  return (
    <div>
      <h1 className={styles.title}>{props.message}</h1>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  //const response = await fetch(`http://backend:8080/user`);
  //const body = await response.text(); //
  const body = "New Chat"
  return {
    props: {
      message: body
    }
  }
}


export default Home

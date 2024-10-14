import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/comps",
      permanent: false,
    },
  };
};

export default function Index() {
  return null;
}

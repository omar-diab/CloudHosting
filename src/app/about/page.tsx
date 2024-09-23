import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage = () => {
  return (
    <section className="fix-height container m-auto">
      <h1 className="text-5xl font-bold text-red-500 p-5 py-7">About This app</h1>
      <p className="px-5 text-gray-500 text-3xl">
        The best web hosting solution for your online success
      </p>
    </section>
  )
}

export default AboutPage
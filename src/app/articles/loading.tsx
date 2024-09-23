const articleLoadingSkeleton = [1, 2, 3, 4, 5, 6];

const ArticleLoading = () => {
  return (
    <section className="fix-height container m-auto animate-pulse">
      <div className="my-7 w-full md:w-2/3 m-auto bg-gray-300 h-14 rounded-lg" />
      <div className="flex items-center justify-center flex-wrap gap-7 mt-6">
        {articleLoadingSkeleton.map((item) => (
          <div
            key={item}
            className="p-5 rounded-lg my-1 bg-gray-200 w-full md:w-2/5 lg:w-1/4"
          >
            <h3 className="bg-gray-300 h-6" />
            <p className="my-2 text-lg bg-gray-300 h-10 p-1" />
            <div className="w-full block rounded-lg p-2 bg-gray-400 h-8" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-7">
        <div className="bg-gray-300 w-72 rounded-sm h-9"/>
      </div>
    </section>
  );
};

export default ArticleLoading;

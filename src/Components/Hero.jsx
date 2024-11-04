import { FaLink } from "react-icons/fa";
import { copy, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../Services/article";
import { useEffect, useState } from "react";

const Hero = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);

  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <div>
      <section className="mt-16 w-full max-w-xl">
        <div className="flex flex-col w-full gap-2">
          <form
            className="relative flex justify-center"
            onSubmit={handleSubmit}
          >
            <FaLink className="absolute left-0 my-3 ml-2 w-5S text-gray-400" />
            <input
              type="url"
              placeholder="Paste your link here..."
              value={article.url}
              onChange={(e) => setArticle({ article, url: e.target.value })}
              required
              className="block w-full rounded-md bg-gray-800 py-2.5 pl-10 pr-12 text-sm shadow-2xl font-Alatsi font-medium focus:border-gray-800 focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-8 items-center justify-center font-bold text-gray-400"
            >
              →
            </button>
          </form>
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticles.map((item, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(item)}
                className="p-3 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer"
              >
                <div
                  onClick={() => handleCopy(item.url)}
                  className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
                >
                  <img
                    src={copied === item.url ? tick : copy}
                    alt="copy_icon"
                    className="w-[40%] h-[40%] object-contain"
                  />
                </div>
                <p className="flex-1 font-Alatsi text-blue-700 font-medium text-sm truncate">
                  {item.url}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
          ) : error ? (
            <p className="font-Alatsi font-bold text-black text-center">
              Thats not supposed to happen <br />
              <span className="font-Poppins font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-Poppins font-bold text-gray-300 text-xl">
                  Article{" "}
                  <span className="font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Summary
                  </span>
                </h2>
                <div className="rounded-xl border border-gray-800 bg-black/70 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4">
                  <p className="text-white font-Alatsi">{article.summary}</p>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Hero;

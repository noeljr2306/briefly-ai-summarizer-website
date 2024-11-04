const Navbar = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full pt-3">
        <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 font-Poppins font-bold mt-4">
          Briefly
        </h1>
      </nav>
      <h1 className=" mt-5 text-5xl font-extrabold leading-[1.15] text-gray-300 sm:text-6xl text-center">
        Summarize your articles briefly with{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          Briefly
        </span>
      </h1>
      <h2 className=" mt-5 text-lg text-gray-100 sm:text-xl text-center max-w-2xl">
        Make your reading simpler with briefly, an open source AI article
        summarizer that transforms long articles into clear summaries. Try it
        today!
      </h2>
      <br />
    </header>
  );
};

export default Navbar;

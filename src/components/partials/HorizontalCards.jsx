import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg"

const HorizontalCards = ({ data }) => {
  // Ref for the scrollable container
  const scrollContainer = useRef(null);

  // State to manage visibility of navigation arrows
  const [isScrollable, setIsScrollable] = useState({
    left: false, // Initially, no scrolling is needed to the left
    right: true, // Initially, assume there is content to scroll to the right
  });

  // Function to handle scrolling left or right
  const handleScroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 300; // Number of pixels to scroll
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Function to dynamically update arrow visibility
  const updateScrollButtons = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setIsScrollable({
        left: scrollLeft > 0, // Show left arrow if scrolled past the start
        right: scrollLeft + clientWidth < scrollWidth, // Show right arrow if more content exists
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      {isScrollable.left && (
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-yellow-600 rounded-full text-white hover:bg-gray-700"
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainer}
        className="relative flex overflow-x-auto gap-3 p-5 scrollbar-hide" // Scrollbar hidden but scrolling enabled
        onScroll={updateScrollButtons}
        onMouseDown={(e) => {
          e.preventDefault(); // Prevent text selection while dragging
          const startX = e.pageX;
          const startScroll = scrollContainer.current.scrollLeft;

          const onMouseMove = (moveEvent) => {
            scrollContainer.current.scrollLeft =
              startScroll - (moveEvent.pageX - startX); // Dragging logic
          };

          const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
          };

          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
        }}
      >
        {data.length > 0 ? data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="group min-w-[16%] h-[300px] bg-zinc-900 mr-5 hover:border-[#6556CD] rounded-lg overflow-hidden flex flex-col"
          >
            {/* Image Wrapper */}
            <div className="relative w-full h-[60%] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                src={d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`:noimage}
                alt="Card Thumbnail"
              />
            </div>
            {/* Card Content */}
            <div className="text-white p-3 h-[40%] flex flex-col justify-between">
              <h1 className="text-xl h-[30%] font-bold">
                {d.title || d.name || d.original_name || d.original_title}
              </h1>
              <p className="h-[70%] mt-6 mb-3 text-sm">
                {d.overview.slice(0, 85)}...
                <span className="text-zinc-500"> more</span>
              </p>
            </div>
          </Link>
        )): <h1 className="text-3xl text-white font-black text-center mt-5">Nothing to show</h1>}
      </div>

      {/* Right Arrow */}
      {isScrollable.right && (
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-yellow-500 p-2 rounded-full text-white hover:bg-gray-700"
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
      )}
    </div>
  );
};

export default HorizontalCards;

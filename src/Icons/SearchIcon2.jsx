const SearchIcon2 = ({ fill, height = "24" }) => {
  return (
    <>
      <svg
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        data-testid="search-icon"
        className="Svg-sc-ytk21e-0 bHdpig M9l40ptEBXPm03dU3X1k"
        viewBox="0 0 24 24"
        height={height}
        fill={fill ? fill : "#b3b3b3"}
      >
        <path d="M 10 2 C 5.589 2 2 5.589 2 10 C 2 14.411 5.589 18 10 18 C 12.026 18 13.872203 17.236234 15.283203 15.990234 L 21.283203 21.990234 L 21.990234 21.283203 L 15.990234 15.283203 C 17.236234 13.872203 18 12.026 18 10 C 18 5.589 14.411 2 10 2 z M 10 3 C 13.86 3 17 6.14 17 10 C 17 13.86 13.86 17 10 17 C 6.14 17 3 13.86 3 10 C 3 6.14 6.14 3 10 3 z M 10 4 A 6 6 0 0 0 10 16 A 6 6 0 0 0 10 4 z" />      </svg>
    </>
  );
};

export default SearchIcon2;

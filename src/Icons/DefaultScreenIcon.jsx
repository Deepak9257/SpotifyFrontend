const DefaultScreenIcon = ({ height, width, fill }) => {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      className="e-9640-icon"
      viewBox="0 0 24 24"
      height={height ? height : 24}
      width={width ? width : 24}
      fill={fill ? fill : 'white'}
    >
      <path d="M21.707 2.293a1 1 0 0 1 0 1.414L17.414 8h1.829a1 1 0 0 1 0 2H14V4.757a1 1 0 1 1 2 0v1.829l4.293-4.293a1 1 0 0 1 1.414 0zM2.293 21.707a1 1 0 0 1 0-1.414L6.586 16H4.757a1 1 0 0 1 0-2H10v5.243a1 1 0 0 1-2 0v-1.829l-4.293 4.293a1 1 0 0 1-1.414 0z"></path>
    </svg>
  );
};

export default DefaultScreenIcon;

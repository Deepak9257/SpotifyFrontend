const AddIcon = ({height, width, fill="white"}) => {
  return (
    <>
      <svg
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        viewBox="0 0 16 16"
        height={height ? height : 16 }
        width={width ? width : 16}
        fill={fill}
        className="Svg-sc-ytk21e-0 dYnaPI"
      >
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
        <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
      </svg>
    </>
  );
};

export default AddIcon;

const NowPlayingIcon = ({ height, width, fill }) => {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      className="e-9640-icon"
      viewBox="0 0 16 16"
      height={height ? height : 16}
      width={width ? width : 16}
      fill={fill ? fill : 'white'}
    >
<path d="M11.196 8 6 5v6l5.196-3z"></path>
<path d="M15.002 1.75A1.75 1.75 0 0 0 13.252 0h-10.5a1.75 1.75 0 0 0-1.75 1.75v12.5c0 .966.783 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75V1.75zm-1.75-.25a.25.25 0 0 1 .25.25v12.5a.25.25 0 0 1-.25.25h-10.5a.25.25 0 0 1-.25-.25V1.75a.25.25 0 0 1 .25-.25h10.5z"></path>

    </svg>
  )
}

export default NowPlayingIcon;
interface Props {
  className: string;
  style: React.CSSProperties;
  fill: string;
}

const Arrow: React.FC<Props> = ({ className, style, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      // fill="#000000"
      fill={fill}
      viewBox="0 0 256 256"
      className={className}
      style={style}
    >
      <path d="M224,128a8,8,0,0,1-4.58,7.23l-152,72a8,8,0,1,1-6.85-14.46L197.31,128,60.58,63.23a8,8,0,1,1,6.85-14.46l152,72A8,8,0,0,1,224,128Z"></path>
    </svg>
  );
};

export default Arrow;

import { AppConfig } from '../utils/AppConfig';

const Logo = (props) => {
  const size = props.xl ? '44' : '32';
  const fontStyle = props.xl
    ? 'font-semibold text-3xl text-white'
    : 'font-semibold text-xl';

  return (
    <span className={`inline-flex items-center ${fontStyle}`}>
      <img
        className="mr-1"
        src="https://www.svgrepo.com/show/427666/beach-island-summer.svg"
        alt="Logo"
        width={size}
        height={size}
      />
      {AppConfig.site_name}
    </span>
  );
};

export { Logo };

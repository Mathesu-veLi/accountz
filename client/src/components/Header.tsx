import { PiGearSixLight, PiPlusCircleLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <div className="flex justify-center items-center mb-4">
      <div className="flex justify-between w-11/12 py-4">
        <PiGearSixLight className="w-7 h-7" />
        <h1 className="font-light"><Link to="/">Password</Link></h1>
        <Link to="/password">
          <PiPlusCircleLight className="w-7 h-7" />
        </Link>
      </div>
    </div>
  );
}

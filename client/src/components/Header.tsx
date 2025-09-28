import { PiPlusCircleLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { AccountDropdown } from './AccountDropdown';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export function Header() {
  return (
    <div className="flex justify-center items-center mb-4">
      <div className="flex justify-between w-11/12 py-4">
        <AccountDropdown />
        <h1 className="font-light flex justify-center items-center gap-3">
          <Link to="/dashboard">Accountz</Link>
          <div className="flex justify-center items-center gap-1">
            <Link
              to="https://github.com/Mathesu-veLi"
              className="border border-transparent hover:border-white p-1 flex justify-center items-center transition duration-500"
            >
              <FaGithub />
            </Link>
            <Link
              to="https://www.linkedin.com/in/mathsvl/"
              className="border border-transparent hover:border-white p-1 flex justify-center items-center transition duration-500"
            >
              <FaLinkedin />
            </Link>
          </div>
        </h1>
        <Link to="/account">
          <Button variant="ghost">
            <PiPlusCircleLight className="w-7 h-7" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

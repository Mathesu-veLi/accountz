import { PiPlusCircleLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { AccountDropdown } from './AccountDropdown';

export function Header() {
  return (
    <div className="flex justify-center items-center mb-4">
      <div className="flex justify-between w-11/12 py-4">
        <AccountDropdown />
        <h1 className="font-light">
          <Link to="/dashboard">Password</Link>
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

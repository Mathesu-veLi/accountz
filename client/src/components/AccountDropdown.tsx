import { PiGearSixLight } from 'react-icons/pi';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';

export function AccountDropdown() {
  const { name } = useUserStore().user;
  const { reset } = useUserStore();

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <PiGearSixLight className="w-7 h-7" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel>{!name ? 'My Account' : name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!name ? (
            <div className="flex gap-2">
              <DropdownMenuItem>
                <Link to="/login" className="px-4 py-2">
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/register" className="px-4 py-2">
                  Register
                </Link>
              </DropdownMenuItem>
            </div>
          ) : (
            <div>
              <DropdownMenuItem
                onClick={() => {
                  toast('User successfully logged out');
                  navigate('/');
                  reset();
                }}
              >
                Logout
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

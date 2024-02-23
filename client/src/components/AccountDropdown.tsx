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
import { Link } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { useAccountStore } from '@/store/useAccountStore';

export function AccountDropdown() {
  const { name } = useUserStore().user;
  const { reset: resetUser } = useUserStore();
  const { reset: resetAccounts } = useAccountStore();

  function logout() {
    resetUser();
    resetAccounts();
    window.location.reload();
  }

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
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

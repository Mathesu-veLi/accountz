import { IPassword } from '@/interfaces/IPassword';
import { Link } from 'react-router-dom';

interface IProps {
  website: string;
  password: IPassword;
  quantityOfPasswords: number;
}

export function WebsitePasswordCard(props: IProps) {
  return (
    <Link
      to={`/password/${props.website}`}
      key={props.website}
      className="flex gap-5"
    >
      <div className="p-4 border rounded-sm w-16 h-16 flex justify-center items-center">
        ?
      </div>
      <div className="h-16">
        <h1 className="font-semibold tracking-wider">{props.website}</h1>
        <p className="text-sm text-gray-400">{props.password.username}</p>
        <div className="flex justify-center items-center text-sm text-gray-400 gap-3">
          <p>{props.password.email}</p>
          {props.quantityOfPasswords > 1 && <span>+{props.quantityOfPasswords - 1}</span>}
        </div>
      </div>
    </Link>
  );
}

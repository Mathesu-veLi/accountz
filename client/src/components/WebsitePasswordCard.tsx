import { IAccount } from '@/interfaces/IAccount';
import { Link } from 'react-router-dom';

interface IProps {
  website: string;
  firstAccount: IAccount;
  quantityOfAccounts: number;
}

export function WebsiteAccountCard(props: IProps) {
  return (
    <Link
      to={`/account/${props.website}`}
      key={props.website}
      className="flex gap-5"
    >
      <div className="p-4 border rounded-sm w-16 h-16 flex justify-center items-center">
        <img
          src={`${props.firstAccount.websiteUrl}/favicon.ico`}
          className="w-full h-full"
        />
      </div>
      <div className="h-16">
        <h1 className="font-semibold tracking-wider">{props.website}</h1>
        <p className="text-sm text-gray-400">{props.firstAccount.username}</p>
        <div className="flex justify-center items-center text-sm text-gray-400 gap-3">
          <p>{props.firstAccount.email}</p>
          {props.quantityOfAccounts > 1 && (
            <span>+{props.quantityOfAccounts - 1}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

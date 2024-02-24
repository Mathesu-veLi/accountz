import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowDropright } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useAccountStore } from '@/store/useAccountStore';
import { IAccount } from '@/interfaces/IAccount';

export function WebsiteAccounts() {
  const websiteParam = useParams().website as string;
  const { accounts } = useAccountStore();
  const websitePasswords = (accounts as Record<string, IAccount[]>)[
    websiteParam
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (!websitePasswords || !websitePasswords.length) {
      toast.error('Website not registered');
      return navigate('/dashboard');
    }
  });

  return (
    <div className="flex justify-center">
      <div className="mx-10 flex justify-center items-center flex-col gap-10 mt-10 border p-8 lg:p-10 rounded-sm">
        <h1 className="text-lg font-semibold">{websiteParam}</h1>
        {websitePasswords &&
          websitePasswords.map((password, index) => (
            <Link
              to={`/account/${websiteParam}/${index}`}
              key={index}
              className="flex p-4 border rounded-sm justify-between items-center w-full gap-5"
            >
              <h1>{password?.email}</h1>
              <IoMdArrowDropright />
            </Link>
          ))}
      </div>
    </div>
  );
}

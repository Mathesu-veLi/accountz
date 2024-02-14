import { usePasswordStore } from '@/store/usePasswordStore';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowDropright } from 'react-icons/io';
import { toast } from 'react-toastify';

export function WebsitePasswords() {
  const websiteParam = useParams().website as string;
  const { passwords: globalPasswords } = usePasswordStore();
  const websitePasswords = globalPasswords[websiteParam];

  const navigate = useNavigate();

  if (!websitePasswords) {
    toast.error('Website not registered');
    return navigate('/');
  }

  return (
    <div className="flex justify-center">
      <div className="mx-10 flex justify-center items-center flex-col gap-10 mt-10 border p-8 lg:p-10 rounded-sm">
        <h1 className="text-lg font-semibold">{websiteParam}</h1>
        {websitePasswords.map((password, index) => (
          <Link
            to={`/password/${websiteParam}/${index}`}
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

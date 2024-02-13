import { usePasswordStore } from '@/store/usePasswordStore';
import { Link, useParams } from 'react-router-dom';
import { IoMdArrowDropright } from 'react-icons/io';

export function WebsitePasswords() {
  const { website: websiteParam } = useParams();
  const { passwords: globalPasswords } = usePasswordStore();
  const websitePasswords = Object.entries(globalPasswords).filter(
    ([website, passwords]) => website === websiteParam,
  )[0][1];

  return (
    <div className="flex justify-center">
      <div className="mx-10 flex justify-center items-center flex-col gap-10 mt-10 border p-8 lg:p-10 rounded-sm">
        <h1 className="text-lg font-semibold">{websiteParam}</h1>
        {websitePasswords.map((password, index) => (
          <Link
            to={`/password/${websiteParam}/${index}`}
            key={index}
            className="flex gap-5"
          >
            <div className="p-4 border rounded-sm flex justify-center items-center gap-5">
              <h1>{password?.email}</h1>
              <IoMdArrowDropright />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

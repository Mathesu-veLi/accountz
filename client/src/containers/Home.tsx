import { usePasswordStore } from '@/store/usePasswordStore';
import { Link } from 'react-router-dom';

export function Home() {
  const { passwords } = usePasswordStore();

  return (
    <div className="flex justify-center">
      <div className="w-11/12 lg:w-3/6 mx-10 flex flex-col gap-5">
        {Object.entries(passwords).map(([website, passwords]) => (
          <Link
            to={`/password/${website}`}
            key={website}
            className="flex gap-5"
          >
            <div className="p-4 border rounded-sm w-16 h-16 flex justify-center items-center">
              ?
            </div>
            <div className="h-16">
              <h1 className="font-semibold tracking-wider">{website}</h1>
              <p className="text-sm text-gray-400">{passwords[0].username}</p>
              <div className="flex justify-center items-center text-sm text-gray-400 gap-3">
                <p>{passwords[0].email}</p>
                {passwords.length > 1 && (
                  <span>
                    +
                    {passwords.reduce(
                      (accountsOnThisSite) => accountsOnThisSite + 1,
                      -1,
                    )}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { usePasswordStore } from '@/store/usePasswordStore';

export function Home() {
  const { passwords } = usePasswordStore();

  return (
    <div className="flex justify-center">
      <div className="w-11/12 mx-10">
        {passwords.map((password) => (
          <div key={password.website}>
            <div>
              <h1 className="text-lg font-semibold tracking-wider">
                {password.website}
              </h1>
              <p className="text-sm text-gray-400">
                {password.username}
              </p>
              <p className="text-sm text-gray-400">
                {password.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

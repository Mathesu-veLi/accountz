import { usePasswordStore } from '@/store/usePasswordStore';

export function Home() {
  const { passwords } = usePasswordStore();

  return (
    <div className="flex justify-center">
      <div className="w-11/12 mx-10">
        {passwords.map((password) => (
          <div key={password.website} className="flex gap-5">
            <div className="p-4 border rounded-sm w-16 h-16 flex justify-center items-center">
              ?
            </div>
            <div className="h-16">
              <h1 className="font-semibold tracking-wider">
                {password.website}
              </h1>
              <p className="text-sm text-gray-400">{password.username}</p>
              <p className="text-sm text-gray-400">{password.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

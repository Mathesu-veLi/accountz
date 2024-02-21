import { WebsitePasswordCard } from '@/components/WebsitePasswordCard';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';

interface IAccount {
  website: string;
  username: string;
  email: string;
  password: string;
}

export function Home() {
  const { id } = useUserStore().user;
  const [passwords, setPasswords] = useState<IAccount[]>([]);

  useEffect(() => {
    api.get(`users/${id}`).then((res) => {
      setPasswords(res.data.passwords);
    });
  }, [id]);

  const accounts: Record<string, IAccount[]> = {};
  passwords.forEach((pass) => {
    if (!accounts[pass.website]) return (accounts[pass.website] = [pass]);
    return accounts[pass.website].push(pass);
  });


  if (!passwords)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-light">No password registered</h1>
      </div>
    );

  return (
    <div className="flex justify-center">
      <div className="w-11/12 lg:w-3/6 mx-10 flex flex-col gap-5">
        {Object.entries(accounts).map(([website, passwords]) => (
          <WebsitePasswordCard
            website={website}
            password={passwords[0]}
            quantityOfPasswords={passwords.length}
          />
        ))}
      </div>
    </div>
  );
}

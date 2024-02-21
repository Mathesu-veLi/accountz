import { WebsitePasswordCard } from '@/components/WebsitePasswordCard';
import { IAccount } from '@/interfaces/IAccount';
import { api } from '@/lib/axios';
import { useAccountStore } from '@/store/useAccountStore';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';

export function Home() {
  const { id } = useUserStore().user;
  const { setAccounts: setStateAccounts } = useAccountStore();
  const [passwords, setPasswords] = useState<IAccount[]>([]);
  const [accounts, setAccounts] = useState<Record<string, IAccount[]>>();

  useEffect(() => {
    api.get(`users/${id}`).then((res) => {
      setPasswords(res.data.passwords);
    });
  }, [id]);

  useEffect(() => {
    const accounts: Record<string, IAccount[]> = {};
    passwords.forEach((pass) => {
      if (!accounts[pass.website]) return (accounts[pass.website] = [pass]);
      return accounts[pass.website].push(pass);
    });
    setStateAccounts(accounts);
    setAccounts(accounts);
  }, [passwords, setAccounts, setStateAccounts]);

  if (!passwords)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-light">No password registered</h1>
      </div>
    );

    if(!accounts) return

  return (
    <div className="flex justify-center">
      <div className="w-11/12 lg:w-3/6 mx-10 flex flex-col gap-5">
        {Object.entries(accounts).map(
          ([website, passwords]) => (
            <WebsitePasswordCard
              website={website}
              password={passwords[0]}
              quantityOfPasswords={passwords.length}
            />
          ),
        )}
      </div>
    </div>
  );
}

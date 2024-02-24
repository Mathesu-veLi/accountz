import { WebsitePasswordCard } from '@/components/WebsitePasswordCard';
import { IAccount } from '@/interfaces/IAccount';
import { api } from '@/lib/axios';
import { useAccountStore } from '@/store/useAccountStore';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';

export function Home() {
  const { id } = useUserStore().user;
  const { setAccounts: setStateAccounts } = useAccountStore();
  const [globalPasswords, setGlobalPasswords] = useState<IAccount[]>([]);
  const [accounts, setAccounts] = useState<Record<string, IAccount[]>>();
  const [isLoading, setIsLoading] = useState(false);
  const accountsTemp: Record<string, IAccount[]> = {};

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      api.get(`users/${id}`).then((res) => {
        setIsLoading(false);
        setGlobalPasswords(res.data.passwords);
      });
    }
  }, [id]);

  useEffect(() => {
    globalPasswords.forEach((pass) => {
      if (!accountsTemp[pass.website])
        return (accountsTemp[pass.website] = [pass]);
      return accountsTemp[pass.website].push(pass);
    });
    setStateAccounts(accountsTemp);
    setAccounts(accountsTemp);
  }, [globalPasswords]);

  if (!accounts) return;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-light">Loading...</h1>
      </div>
    );

  return globalPasswords.length ? (
    <div className="flex justify-center">
      <div className="w-11/12 lg:w-3/6 mx-10 flex flex-col gap-5">
        {Object.entries(accounts).map(([website, passwords]) => (
          <WebsitePasswordCard
            key={website}
            website={website}
            password={passwords[0]}
            quantityOfPasswords={passwords.length}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-light">No password registered</h1>
    </div>
  );
}

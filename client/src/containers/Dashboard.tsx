import { WebsiteAccountCard } from '@/components/WebsitePasswordCard';
import { IAccount } from '@/interfaces/IAccount';
import { api } from '@/lib/axios';
import { useAccountStore } from '@/store/useAccountStore';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';

export function Dashboard() {
  const { id } = useUserStore().user;
  const { setAccounts: setStateAccounts } = useAccountStore();
  const [globalAccounts, setGlobalAccounts] = useState<IAccount[]>([]);
  const [accounts, setAccounts] = useState<Record<string, IAccount[]>>();
  const [isLoading, setIsLoading] = useState(false);
  const accountsTemp: Record<string, IAccount[]> = {};

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      api.get(`users/${id}`).then((res: { data: { accounts: IAccount[] } }) => {
        setIsLoading(false);
        const accounts = res.data.accounts.map((website) => {
          delete website.password;
          return website;
        });

        setGlobalAccounts(accounts);
      });
    }
  }, [id]);

  useEffect(() => {
    globalAccounts.forEach((account) => {
      if (!accountsTemp[account.website])
        return (accountsTemp[account.website] = [account]);
      return accountsTemp[account.website].push(account);
    });
    setStateAccounts(accountsTemp);
    setAccounts(accountsTemp);
  }, [globalAccounts]);

  if (!accounts) return;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-light">Loading...</h1>
      </div>
    );

  return globalAccounts.length ? (
    <div className="flex justify-center">
      <div className="w-11/12 lg:w-3/6 mx-10 flex flex-col gap-5">
        {Object.entries(accounts).map(([website, accountsIterator]) => (
          <WebsiteAccountCard
            key={website}
            website={website}
            firstAccount={accountsIterator[0]}
            quantityOfAccounts={accountsIterator.length}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-light">No account registered</h1>
    </div>
  );
}

import { WebsitePasswordCard } from '@/components/WebsitePasswordCard';
import { usePasswordStore } from '@/store/usePasswordStore';

export function Home() {
  const { passwords: globalPasswords } = usePasswordStore();

  let quantityOfPasswords = 0;
  for (const [, passwords] of Object.entries(globalPasswords)) {
    quantityOfPasswords += passwords.length;
  }

  if (!quantityOfPasswords)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-light">No password registered</h1>
      </div>
    );

  return (
    <div className="flex justify-center">
      <div className="w-11/12 lg:w-3/6 mx-10 flex flex-col gap-5">
        {Object.entries(globalPasswords).map(([website, passwords]) => (
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

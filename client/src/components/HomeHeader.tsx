import { GoGear, GoPlusCircle } from 'react-icons/go';

export function HomeHeader() {
  return (
    <div className="flex justify-between p-6">
      <GoGear className="w-7 h-7" />
      <h1>Password</h1>
      <GoPlusCircle className="w-7 h-7" />
    </div>
  );
}

import { PiGearSixLight, PiPlusCircleLight } from 'react-icons/pi';

export function Header() {
  return (
    <div className="flex justify-between p-6">
      <PiGearSixLight className="w-7 h-7" />
      <h1 className="font-light">Password</h1>
      <PiPlusCircleLight className="w-7 h-7" />
    </div>
  );
}

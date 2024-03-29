import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { generateRandomInt } from '@/lib/utils';
import { Slider } from './ui/slider';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';

type IOptions = 'lower' | 'upper' | 'number' | 'symbol';

interface IProps {
  setFormPassword: React.Dispatch<React.SetStateAction<string>>;
}

export function PasswordGenerator(props: IProps) {
  const [password, setPassword] = useState<string>('passwoRd123!');
  const [passwordSize, setPasswordSize] = useState<number>(10);
  const [passwordOptions, setPasswordOptions] = useState<IOptions[]>(['lower']);
  const [copied, setCopied] = useState(false);

  function generatePassword() {
    let tempPassword = '';
    for (let i = 0; i < passwordSize; i++) {
      let subPassword = '';

      passwordOptions.forEach((option) => {
        switch (option) {
          case 'lower':
            subPassword += String.fromCharCode(generateRandomInt(97, 122));
            break;
          case 'upper':
            subPassword += String.fromCharCode(generateRandomInt(65, 90));
            break;
          case 'number':
            subPassword += String.fromCharCode(generateRandomInt(48, 57));
            break;
          case 'symbol':
            subPassword += String.fromCharCode(generateRandomInt(33, 47));
            break;
        }
      });

      tempPassword +=
        subPassword[generateRandomInt(0, passwordOptions.length - 1)];
    }
    setPassword(tempPassword);
  }

  useEffect(() => {
    if (!passwordOptions.length) {
      setPasswordOptions(['lower']);
    }

    generatePassword();
  }, [passwordOptions, passwordSize]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Generate Password</DialogTitle>
        <DialogDescription>
          Generate a strong password with letters, numbers and symbols
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-center items-center gap-7">
        <Input
          className="text-lg max-w-80 break-words font-mono text-center border-0"
          value={password}
        />
        <Button
          variant="ghost"
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(password);
            setCopied(true);
          }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </div>
      <div className="grid gap-7">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2>Number of Characters</h2>
          <div className="flex gap-4 w-64">
            <Input
              type="number"
              className="w-2/6"
              value={passwordSize}
              max={25}
              min={1}
              onChange={(e) => setPasswordSize(Number(e.target.value))}
            />
            <Slider
              max={25}
              min={1}
              step={1}
              className="w-4/6"
              value={[passwordSize]}
              onValueChange={([value]) => setPasswordSize(value)}
            />
          </div>
        </div>

        <ToggleGroup
          type="multiple"
          className="*:w-10"
          onValueChange={(e: IOptions[]) => setPasswordOptions(e)}
          value={passwordOptions}
        >
          <ToggleGroupItem value="upper" title="Uppercase">
            A
          </ToggleGroupItem>
          <ToggleGroupItem value="lower" title="Lowercase">
            a
          </ToggleGroupItem>
          <ToggleGroupItem value="number" title="Numbers">
            1
          </ToggleGroupItem>
          <ToggleGroupItem value="symbol" title="Special characters">
            !
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex justify-center mt-4">
        <DialogClose asChild>
          <Button type="submit" onClick={() => props.setFormPassword(password)}>
            Use the generated password
          </Button>
        </DialogClose>
      </div>
    </>
  );
}

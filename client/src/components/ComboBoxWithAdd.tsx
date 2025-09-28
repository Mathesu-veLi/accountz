import { useState, useMemo, useEffect } from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/axios';
import { IAccount } from '@/interfaces/IAccount';
import { useUserStore } from '@/store/useUserStore';

interface WebsiteOption {
  name: string;
  url: string;
}

interface ComboBoxWithAddProps {
  value: WebsiteOption | null;
  onChange: (value: WebsiteOption) => void;
}

export function ComboBoxWithAdd({ value, onChange }: ComboBoxWithAddProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<WebsiteOption[]>([
    { name: '', url: '' },
  ]);

  const { id } = useUserStore().user;
  useEffect(() => {
    api.get(`users/${id}`).then((res: { data: { accounts: IAccount[] } }) => {
      const newAccounts: WebsiteOption[] = [];

      res.data.accounts.forEach((completeWebsiteData) => {
        const websiteAlreadyExists = newAccounts.find(
          (opt) => opt.name === completeWebsiteData.website,
        );

        if (!websiteAlreadyExists) {
          newAccounts.push({
            name: completeWebsiteData.website,
            url: completeWebsiteData.websiteUrl,
          });
        }
      });

      setOptions(newAccounts);
    });
  }, [id]);

  const [inputValue, setInputValue] = useState('');
  const [showAddFields, setShowAddFields] = useState(false);
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteUrl, setNewSiteUrl] = useState('');

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.name.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [inputValue, options]);

  const handleSelect = (val: WebsiteOption) => {
    onChange(val);
    setInputValue(val.name);
    setOpen(false);
  };

  const handleAdd = () => {
    if (!newSiteName.trim() || !newSiteUrl.trim()) return;

    const newOption = {
      name: newSiteName.trim(),
      url: newSiteUrl.trim(),
    };

    setOptions([...options, newOption]);
    onChange(newOption);
    setInputValue('');
    setNewSiteName('');
    setNewSiteUrl('');
    setShowAddFields(false);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setShowAddFields(false);
          setInputValue('');
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex items-center gap-2 justify-start"
        >
          {value && value.name && value.url ? (
            <>
              <span className="p-1 w-8 h-8 flex items-center justify-center">
                <img
                  src={`https://www.google.com/s2/favicons?sz=32&domain=${value.url}`}
                  alt="favicon"
                  className="w-5 h-5"
                />
              </span>
              <span>{value.name}</span>
            </>
          ) : (
            <span className="text-muted-foreground">Select or add</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[270px] p-2">
        <Command>
          <CommandInput
            placeholder="Search or add..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList className="max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <CommandItem
                key={option.name}
                onSelect={() => handleSelect(option)}
                className="flex items-center gap-3 py-2"
              >
                <div className="border rounded-sm p-1 w-8 h-8 flex items-center justify-center">
                  <img
                    src={`https://www.google.com/s2/favicons?sz=32&domain=${option.url}`}
                    alt="favicon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex flex-col">
                  <span>{option.name}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                    {option.url}
                  </span>
                </div>
              </CommandItem>
            ))}
            {filteredOptions.length === 0 &&
              inputValue.trim() &&
              !showAddFields && (
                <div className="px-2 py-2">
                  <Button
                    onClick={() => {
                      setShowAddFields(true);
                      setNewSiteName(inputValue);
                    }}
                    size="sm"
                    variant="ghost"
                    className="w-full"
                  >
                    Add "{inputValue}"
                  </Button>
                </div>
              )}
          </CommandList>
        </Command>

        {showAddFields && (
          <div className="flex flex-col gap-2 mt-3 p-2 border-t pt-2">
            <Input
              placeholder="Website name"
              value={newSiteName}
              onChange={(e) => setNewSiteName(e.target.value)}
            />
            <Input
              placeholder="Website URL"
              value={newSiteUrl}
              onChange={(e) => setNewSiteUrl(e.target.value)}
            />
            <Button onClick={handleAdd} size="sm" className="w-full">
              Confirm
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

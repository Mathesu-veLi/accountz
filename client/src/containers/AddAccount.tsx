import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '@/components/PasswordInput';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { api } from '@/lib/axios';
import { ButtonLoading } from '@/components/ButtonLoading';
import { GearIcon } from '@radix-ui/react-icons';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { PasswordGenerator } from '@/components/PasswordGenerator';
import { ComboBoxWithAdd } from '@/components/ComboBoxWithAdd';

const formSchema = z.object({
  website: z.string().min(1),
  websiteUrl: z.string(),
  username: z.string(),
  email: z.string().min(1).email('Email not valid'),
  password: z.string().min(1),
});

type TFormSchema = z.infer<typeof formSchema>;

export function AddAccounts() {
  const [password, setPassword] = useState('');

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: '',
      websiteUrl: '',
      username: '',
      email: '',
      password: '',
    },
    values: {
      website: '',
      websiteUrl: '',
      username: '',
      email: '',
      password,
    },
  });

  const { id } = useUserStore().user;
  const { token } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      toast('Please log in first');
      navigate('/login');
    }
  }, [id, navigate]);

  async function addAccountToStore(account: TFormSchema) {
    setIsLoading(true);
    await api
      .post(
        '/accounts',
        {
          website: account.website,
          websiteUrl: account.websiteUrl,
          username: account.username,
          email: account.email,
          password: account.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        toast.success('Account saved successfully');
        navigate('/dashboard');
      })
      .catch((e) => toast.error(e.response.data.message));
    setIsLoading(false);
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col justify-between items-center p-4 w-11/12 lg:w-2/6">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(addAccountToStore)}
            className="flex flex-col justify-between items-center gap-5 lg:[&_div]:w-full [&_div]:w-1/3 [&_div]:min-w-64 lg:scale-105 lg:p-5 w-full border rounded-sm p-4"
          >
            <h1 className="lg:text-xl font-semibold tracking-wider">Add</h1>

            <FormField
              control={form.control}
              name="website"
              render={() => (
                <FormItem>
                  <FormLabel>Website name</FormLabel>
                  <FormControl>
                    <ComboBoxWithAdd
                      value={{
                        name: form.watch('website'),
                        url: form.watch('websiteUrl'),
                      }}
                      onChange={(val) => {
                        form.setValue('website', val.name);
                        form.setValue('websiteUrl', val.url);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Username
                    <span className="text-gray-300 italic text-xs">
                      {' '}
                      - Optional
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <span className="w-full flex justify-between">
                      <PasswordInput placeholder="password" {...field} />

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" type="button">
                            <GearIcon />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <PasswordGenerator setFormPassword={setPassword} />
                        </DialogContent>
                      </Dialog>
                    </span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button type="submit">Add account</Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

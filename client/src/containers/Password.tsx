import { ButtonLoading } from '@/components/ButtonLoading';
import { PasswordInput } from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import {
  FormField,
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IAccount } from '@/interfaces/IAccount';
import { api } from '@/lib/axios';
import { useAccountStore } from '@/store/useAccountStore';
import { useUserStore } from '@/store/useUserStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string(),
  email: z.string().min(1).email('Email not valid'),
  password: z.string().min(1),
});

type TFormSchema = z.infer<typeof formSchema>;

export function Password() {
  const navigate = useNavigate();

  const website = useParams().website as string;
  const index = Number(useParams().index as string);
  const { accounts } = useAccountStore();
  const { token } = useUserStore();
  const [account, setAccount] = useState<IAccount>();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const websitePasswords = (accounts as Record<string, IAccount[]>)[website];

  useEffect(() => {
    if (!websitePasswords) {
      toast.error('Website not registered');
      return navigate('/');
    }

    const actualAccount = websitePasswords[index];

    if (!actualAccount) {
      toast.error('Account not registered');
      return navigate(`/password/${website}`);
    }
    api
      .get(`/passwords/${actualAccount.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPassword(res.data.password);
      });

    setAccount(actualAccount);
  }, [index, navigate, token, website, websitePasswords]);

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    values: {
      username: account?.username as string,
      email: account?.email as string,
      password: password,
    },
  });

  async function editPassword(newPasswordData: TFormSchema) {
    setIsLoading(true);
    const accountAlreadyRegistered = websitePasswords.some(
      (passwordIterator) =>
        passwordIterator.email === newPasswordData.email &&
        passwordIterator.id !== account?.id,
    );

    if (accountAlreadyRegistered) {
      toast.error(
        "Account already registered. You didn't want to edit the account?",
      );
      return;
    }

    const newPassword = {
      website,
      websiteUrl: account?.websiteUrl,
      username: newPasswordData.username as string,
      email: newPasswordData.email,
      password: newPasswordData.password,
    };

    await api
      .patch(`/passwords/${account?.id}`, newPassword, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success('Password updated successfully');
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.response.data.message);
      });

    setIsLoading(false);
  }

  async function deletePasswordOfTheStore() {
    setIsLoading(true);
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this password?',
    );

    if (!confirmDelete) return;

    await api
      .delete(`/passwords/${account?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success('Password deleted successfully');
        navigate('/');
      })
      .catch((e) => toast.error(e.response.data.message));
    setIsLoading(false);
  }

  return (
    <div className="flex justify-center items-center h-full">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(editPassword)}
          className="flex flex-col justify-between items-center gap-5 lg:[&_div]:w-full [&_div]:w-64 lg:scale-105 lg:p-5 w-2/6"
        >
          <h1 className="lg:text-xl font-semibold tracking-wider">{website}</h1>
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
                  <PasswordInput placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center w-full lg:justify-around">
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button type="submit">Submit</Button>
            )}

            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault();
                  deletePasswordOfTheStore();
                }}
              >
                Delete account
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

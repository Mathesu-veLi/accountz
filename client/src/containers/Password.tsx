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
import { IPassword } from '@/interfaces/IPassword';
import { usePasswordStore } from '@/store/usePasswordStore';
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
  const { passwords: globalPasswords } = usePasswordStore();
  const [password, setPassword] = useState<IPassword>();

  const websitePasswords = globalPasswords[website];

  useEffect(() => {
    if (!websitePasswords) {
      toast.error('Website not registered');
      return navigate('/');
    }

    const actualPassword = websitePasswords[index];

    if (!actualPassword) {
      toast.error('Password not registered');
      return navigate(`/password/${website}`);
    }
    setPassword(actualPassword);
  }, [index, navigate, website, websitePasswords]);

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    values: {
      username: password?.username as string,
      email: password?.email as string,
      password: password?.password as string,
    },
  });

  const { updatePassword } = usePasswordStore();

  function editPassword(newPasswordData: TFormSchema) {
    const accountAlreadyRegistered = globalPasswords[website].some(
      (passwordIterator) =>
        passwordIterator.email === newPasswordData.email &&
        passwordIterator.id !== password?.id,
    );

    if (accountAlreadyRegistered) {
      toast.error(
        "Account already registered. You didn't want to edit the account?",
      );
      return;
    }

    const newPassword = {
      website,
      username: newPasswordData.username as string,
      email: newPasswordData.email,
      password: newPasswordData.password,
    };

    updatePassword(newPassword, index);

    toast.success('Password updated successfully');
    navigate('/');
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

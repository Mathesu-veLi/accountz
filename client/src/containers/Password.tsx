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
  const { id } = useParams();
  const { passwords } = usePasswordStore();
  const [password, setPassword] = useState<IPassword>();
  const navigate = useNavigate();

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
    const newPassword = {
      id: password?.id as number,
      website: password?.website as string,
      username: newPasswordData.username as string,
      email: newPasswordData.email,
      password: newPasswordData.password,
    };

    updatePassword(newPassword);

    toast.success('Password updated successfully');
    navigate('/')
  }

  useEffect(() => {
    const password = passwords.filter((password) => password.id == id)[0];
    console.log(password);
    if (!password) {
      toast.error('Password id not exists');
      navigate('/');
    } else setPassword(password);
  }, [id, navigate, passwords]);

  return (
    <div className="flex justify-center items-center h-full">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(editPassword)}
          className="flex flex-col justify-between items-center gap-5 lg:[&_div]:w-full [&_div]:w-64 lg:scale-105 lg:p-5 w-full"
        >
          <h1 className="lg:text-xl font-semibold tracking-wider">
            {password?.website}
          </h1>
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

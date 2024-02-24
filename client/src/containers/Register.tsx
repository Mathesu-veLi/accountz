import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/PasswordInput';
import { api } from '@/lib/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';
import { ButtonLoading } from '@/components/ButtonLoading';

const formSchema = z
  .object({
    username: z.string().min(1),
    email: z.string().min(1).email('Email not valid'),
    password: z.string().min(6).max(25),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });

type TFormSchema = z.infer<typeof formSchema>;

export function Register() {
  const { id } = useUserStore().user;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (id) {
      toast('User already logged in');
      navigate('/dashboard');
    }
  });

  async function registerUser(form: TFormSchema) {
    setIsLoading(true);
    await api
      .post('/users', {
        name: form.username,
        email: form.email.toLowerCase(),
        password: form.password,
      })
      .then(() => {
        toast.success('Account successfully created');
        navigate('/login');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setIsLoading(false);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-between items-center p-4 w-11/12 lg:w-2/6">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(registerUser)}
            className="flex flex-col justify-between items-center gap-5 lg:[&_div]:w-full [&_div]:w-64 lg:scale-105 lg:p-5 w-full"
          >
            <h1 className="lg:text-xl font-semibold tracking-wider">
              Register
            </h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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
                    <Input placeholder="example@example.com" {...field} />
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
                    <PasswordInput placeholder="password123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="password123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

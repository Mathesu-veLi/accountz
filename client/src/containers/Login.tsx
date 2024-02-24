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
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/axios';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/useUserStore';
import { useEffect } from 'react';

const formSchema = z.object({
  email: z.string().min(1).email('Email not valid'),
  password: z.string().min(6).max(25),
});

type TFormSchema = z.infer<typeof formSchema>;

export function Login() {
  const { setUser, setToken } = useUserStore();
  const { id } = useUserStore().user;
  const navigate = useNavigate();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (id) {
      toast('User already logged in');
      navigate('/');
    }
  }, []);

  function loginUser(form: TFormSchema) {
    api
      .post('/tokens', {
        email: form.email,
        password: form.password,
      })
      .then((res) => {
        setUser(res.data.user);
        setToken(res.data.token);

        toast.success('Successfully logged in');
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-between items-center p-4 w-11/12 lg:w-2/6">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(loginUser)}
            className="flex flex-col justify-between items-center gap-5 lg:[&_div]:w-full [&_div]:w-64 lg:scale-105 lg:p-5 w-full"
          >
            <h1 className="lg:text-xl font-semibold tracking-wider">Login</h1>

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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

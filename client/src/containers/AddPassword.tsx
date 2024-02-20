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
import { usePasswordStore } from '@/store/usePasswordStore';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '@/components/PasswordInput';
import { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';

const formSchema = z.object({
  website: z.string().min(1),
  username: z.string(),
  email: z.string().min(1).email('Email not valid'),
  password: z.string().min(1),
});

type TFormSchema = z.infer<typeof formSchema>;

export function AddPassword() {
  const { id } = useUserStore().user;

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const { addPassword, passwords } = usePasswordStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      toast('Please log in first');
      navigate('/login');
    }
  }, [id, navigate]);

  function addPasswordToStore(password: TFormSchema) {
    if (passwords[password.website]) {
      const accountAlreadyRegistered = passwords[password.website].some(
        (e) => e.email === password.email && e.website === password.website,
      );

      if (accountAlreadyRegistered)
        return toast.error(
          "Account already registered. You didn't want to edit the account?",
        );
    }

    addPassword(password);
    toast.success('Password saved successfully');
    navigate('/');
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col justify-between items-center p-4 w-11/12 lg:w-2/6">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(addPasswordToStore)}
            className="flex flex-col justify-between items-center gap-5 lg:[&_div]:w-full [&_div]:w-64 lg:scale-105 lg:p-5 w-full"
          >
            <h1 className="lg:text-xl font-semibold tracking-wider">Add</h1>
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website name</FormLabel>
                  <FormControl>
                    <Input placeholder="website name" {...field} />
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
    </div>
  );
}

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { usePasswordStore } from '@/store/usePasswordStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const formSchema = z.object({
  username: z.string(),
  email: z.string().min(1).email('Email not valid'),
  password: z.string().min(1),
});

type TFormSchema = z.infer<typeof formSchema>;

export function Password() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const { addPassword } = usePasswordStore();
  const navigate = useNavigate();

  function addPasswordToStore(data: TFormSchema) {
    addPassword(data);
    toast.success('Password saved successfully');
    navigate('/');
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col justify-between items-center border rounded-sm shadow-sm p-4 w-11/12 lg:w-2/6">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(addPasswordToStore)}
            className="flex flex-col justify-between items-center gap-5 lg:[&_div]:w-full lg:scale-105 lg:p-5 w-full"
          >
            <h1 className="lg:text-xl font-semibold tracking-wider">Add</h1>
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
                    <Input placeholder="password" {...field} />
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

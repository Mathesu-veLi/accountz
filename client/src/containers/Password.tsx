import { IPassword } from '@/interfaces/IPassword';
import { usePasswordStore } from '@/store/usePasswordStore';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Password() {
  const { id } = useParams();
  const { passwords } = usePasswordStore();
  const [password, setPassword] = useState<IPassword>();
  const navigate = useNavigate();

  useEffect(() => {
    const password = passwords.filter((password) => password.id == id)[0];
    if (!password) {
      toast.error('Password id not exists');
      navigate('/');
    } else setPassword(password);
  }, [id, navigate, passwords]);

}

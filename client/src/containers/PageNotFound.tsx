import dog404 from '@/assets/dog404.png';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function PageNotFound() {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-10">
      <img
        src={dog404}
        alt="sad dog pixel"
        className="w-36 h-36 absolute bottom-0"
      />

      <h1 className="text-3xl font-bold">404</h1>
      <h2 className="text-xl font-bold">Page Not Found!</h2>
      <Button variant="outline">
        <Link to="/dashboard">Go back to home page</Link>
      </Button>
    </div>
  );
}

import Button from '../components/Button';
import { Error } from './Error';
import { Link } from 'react-router-dom';

export const Fallback = () => (
  <Error code="404" error="This page could not be found">
    <Button asChild>
      <Link to="/">Home</Link>
    </Button>
  </Error>
);

export default Fallback;

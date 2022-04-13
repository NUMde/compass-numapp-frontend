import { setupServer } from 'msw/node';
import endpoints from './endpoints';

export default setupServer(...endpoints);

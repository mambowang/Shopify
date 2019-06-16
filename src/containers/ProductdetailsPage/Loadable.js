/**
 * Asynchronously loads the component for FeaturePage
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index.jsx'),
  loading: () => null,
});

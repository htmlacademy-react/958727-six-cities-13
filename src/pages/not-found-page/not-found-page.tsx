import Layout from '../../components/layout/layout';
import './not-found-page-module.scss';

function NotFoundPage(): JSX.Element {
  return (
    <Layout>
      <main className="catalog not-found">
        <h1 className="not-found__title">Page Not Found</h1>
      </main>
    </Layout>
  );
}

export default NotFoundPage;

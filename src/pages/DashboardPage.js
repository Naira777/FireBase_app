import MainLayout from "../MainLayout";
import AuthDetails from "../components/AuthDetails/AuthDetails";
import SEO from "../components/SEO/SEO";

const DashboardPage = () => {
  return (
    <MainLayout>
      <SEO title="Dashboard" description="Information about User" />
      <AuthDetails />
    </MainLayout>
  );
};
export default DashboardPage;

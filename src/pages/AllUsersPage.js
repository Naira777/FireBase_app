import MainLayout from "../MainLayout";
import AllUsers from "../components/AllUsers/AllUsers";
import SEO from "../components/SEO/SEO";

const AllUsersPage = () => {
  return (
    <MainLayout>
      <SEO title="All Users" description="All Users that are in database" />
      <AllUsers />
    </MainLayout>
  );
};
export default AllUsersPage;

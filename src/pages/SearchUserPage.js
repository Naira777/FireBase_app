import MainLayout from "../MainLayout";
import SearchUser from "../components/SearchUser/SearchUser";
import SEO from "../components/SEO/SEO";

const SearchUserPage = () => {
  return (
    <MainLayout>
      <SEO
        title="Search for a user"
        description="Search user by name, surname or profession."
      />
      <SearchUser />
    </MainLayout>
  );
};
export default SearchUserPage;

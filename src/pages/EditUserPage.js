import MainLayout from "../MainLayout";

import EditUser from "../components/EditUser/EditUser";
import SEO from "../components/SEO/SEO";

const EditUserPage = () => {
  return (
    <MainLayout>
      <SEO
        title="Edite User"
        description="Edite information about user we have choosen: Name, surname, profession and photo."
      />
      <EditUser />
    </MainLayout>
  );
};
export default EditUserPage;

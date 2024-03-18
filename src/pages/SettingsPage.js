import MainLayout from "../MainLayout";

import EditSettings from "../components/EditSettings/EditSettings";
import SEO from "../components/SEO/SEO";

const SettingsPage = () => {
  return (
    <MainLayout>
      <SEO
        title="Edite User"
        description="Edite information of logged User: Name, surname, profession and photo."
      />
      <EditSettings />
    </MainLayout>
  );
};
export default SettingsPage;

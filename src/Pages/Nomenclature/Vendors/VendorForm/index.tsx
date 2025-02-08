import TitleBar from "../../../../Components/TitleBar/TitleBar";
import { VendorDTO } from "../../../../Types/types";
import VendorFormFields, { type VendorFormType, vendorFormSchema } from "../../../../Components/Forms/VendorForm";
import { FormPersistenceProvider } from "../../../../Providers/FormNavigationProvider";
import PersistedForm from "../../../../Components/GenericForm/NavigatedForm";

export default function Index() {
  return (
    <FormPersistenceProvider<VendorDTO>
      endpoints={{
        create: "/api/Vendors/AddVendor",
        update: "/api/Vendors/UpdateVendor"
      }}
      messages={{
        createSuccess: "Доставчикът е добавен успешно",
        createError: "Доставчикът не беше добавен!",
        updateSuccess: "Доставчикът е обновен успешно",
        updateError: "Доставчикът не беше обновен!"
      }}
      queryKey="vendors"
    >
      <TitleBar title="Доставчици - Редакция" />
      <PersistedForm<VendorFormType, VendorDTO>
        zodSchema={vendorFormSchema}
        FormFields={VendorFormFields}
      />
    </FormPersistenceProvider>
  );
}

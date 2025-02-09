import TitleBar from "../../../../Components/TitleBar/TitleBar";
import { VendorDTO } from "../../../../Types/types";
import VendorFormFields, { type VendorFormType, vendorFormSchema } from "../../../../Components/Forms/VendorForm";
import { FormDataProvider } from "../../../../Providers/FormDataProvider";
import FormWithData from "../../../../Components/GenericForm/NavigatedForm";

export default function Index() {
  return (
    <FormDataProvider<VendorDTO>
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
      <FormWithData<VendorFormType, VendorDTO>
        zodSchema={vendorFormSchema}
        FormFields={VendorFormFields}
      />
    </FormDataProvider>
  );
}

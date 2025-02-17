import TitleBar from "../../../../Components/TitleBar/TitleBar";
import { VendorDTO } from "../../../../Types/types";
import VendorFormFields, { type VendorFormType, vendorFormSchema } from "../../../../Components/Forms/VendorForm";
import { FormDataProvider } from "../../../../Components/GenericForm/FormDataProvider";
import FormWithData from "../../../../Components/GenericForm/FormWithData";

export default function Index() {
  return (
    <>
      <TitleBar title="Доставчици - Редакция" />
      <FormDataProvider<VendorDTO, VendorFormType>
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
        zodSchema={vendorFormSchema}
        FormFields={VendorFormFields}
      />
    </>
  );
}

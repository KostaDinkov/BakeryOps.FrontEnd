import { ProductDTO } from "../../../../Types/types";
import { FormDataProvider } from "../../../../Providers/FormDataProvider";
import FormWithData from "../../../../Components/GenericForm/FormWithData";
import ProductFormFields, {
  productFormSchema,
} from "../../../../Components/Forms/ProductsForm";
import { type ProductFormType } from "../../../../Components/Forms/ProductsForm";
export default function Index() {
  const dtoMapper = (
    formData: ProductFormType,
    selectedItem?: ProductDTO
  ): ProductDTO => {
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      return {
        ...formData,
        id: selectedItem.id,
      };
    }
    return formData;
  };

  return (
    <FormDataProvider<ProductDTO>
      endpoints={{
        create: null,
        update: "/api/Products/UpdateProduct/{id}",
      }}
      messages={{
        createSuccess: "Продуктът е създаден успешно",
        createError: "Грешка при създаване на продукта",
        updateSuccess: "Продуктът е обновен успешно",
        updateError: "Грешка при обновяване на продукта",
      }}
      queryKey="products"
    >
      <FormWithData<ProductFormType, ProductDTO>
        zodSchema={productFormSchema}
        FormFields={ProductFormFields}
        dtoMapper={dtoMapper}
      />
    </FormDataProvider>
  );
}

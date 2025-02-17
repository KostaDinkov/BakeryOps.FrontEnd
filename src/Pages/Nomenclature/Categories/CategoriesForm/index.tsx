import TitleBar from "../../../../Components/TitleBar/TitleBar";
import { CategoryDTO } from "../../../../Types/types";
import CategoryFormFields, { type CategoryFormType, categoryFormSchema } from "../../../../Components/Forms/CategoriesForm/CategoriesForm";
import { FormDataProvider } from "../../../../Components/GenericForm/FormDataProvider";


export default function Index() {
  return (
    <>
      <TitleBar title="Категории - Редакция" />
      <FormDataProvider<CategoryDTO, CategoryFormType>
        endpoints={{
          create: "/api/Categories/AddCategory",
          update: "/api/Categories/UpdateCategory"
        }}
        messages={{
          createSuccess: "Категорията е добавена успешно",
          createError: "Категорията не беше добавена!",
          updateSuccess: "Категорията е обновена успешно",
          updateError: "Категорията не беше обновена!"
        }}
        queryKey="categories"
        zodSchema={categoryFormSchema}
        FormFields={CategoryFormFields}
      />
    </>
  );
}

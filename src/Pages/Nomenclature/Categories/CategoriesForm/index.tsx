import TitleBar from "../../../../Components/TitleBar/TitleBar";
import { CategoryDTO } from "../../../../Types/types";
import CategoryFormFields, { type CategoryFormType, categoryFormSchema } from "../../../../Components/Forms/CategoriesForm/CategoriesForm";
import { FormDataProvider } from "../../../../Providers/FormDataProvider";
import FormWithData from "../../../../Components/GenericForm/FormWithData";

export default function Index() {
  return (
    <FormDataProvider<CategoryDTO>
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
    >
      <TitleBar title="Категории - Редакция" />
      <FormWithData<CategoryFormType, CategoryDTO>
        zodSchema={categoryFormSchema}
        FormFields={CategoryFormFields}
      />
    </FormDataProvider>
  );
}

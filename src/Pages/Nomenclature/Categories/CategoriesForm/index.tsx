import TitleBar from "../../../../Components/TitleBar/TitleBar";
import { CategoryDTO } from "../../../../Types/types";
import CategoryFormFields, { type CategoryFormType, categoryFormSchema } from "../../../../Components/Forms/CategoriesForm/CategoriesForm";
import { FormPersistenceProvider } from "../../../../Providers/FormNavigationProvider";
import PersistedForm from "../../../../Components/GenericForm/NavigatedForm";

export default function Index() {
  return (
    <FormPersistenceProvider<CategoryDTO>
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
      <PersistedForm<CategoryFormType, CategoryDTO>
        zodSchema={categoryFormSchema}
        FormFields={CategoryFormFields}
      />
    </FormPersistenceProvider>
  );
}

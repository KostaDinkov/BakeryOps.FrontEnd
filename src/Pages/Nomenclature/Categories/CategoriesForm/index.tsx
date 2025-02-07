import { useLocation, useNavigate } from "react-router";
import TitleBar from "../../../../Components/TitleBar/TitleBar";
import { CategoryDTO } from "../../../../Types/types";
import CategoryFormFields,{type CategoryFormType, categoryFormSchema} from "../../../../Components/Forms/CategoriesForm/CategoriesForm";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../../API/apiClient";
import { useHandleApiResponse } from "../../../../API/apiUtils";
import GenericForm from "../../../../Components/GenericForm/GenericForm";

export default function Index() {
  const location = useLocation();
  const isEdit = !!location.state;
  const handleApiResponse = useHandleApiResponse();
  const { selectedItem } = location.state || {
    selectedItem: {} as CategoryDTO,
  };
  const navigate = useNavigate();

  const addCategory = async (data: CategoryDTO) => {
    await handleApiResponse(
      async () =>
        await apiClient.POST("/api/Categories/AddCategory", { body: data }),
      "Категорията е добавена успешно",
      "Категорията не беше добавена!"
    );
    console.log(data);
  };

  const updateCategory = async (data: CategoryDTO) => {
    await handleApiResponse(
      () => apiClient.PUT("/api/Categories/UpdateCategory", { body: data }),
      "Категорията е обновена успешно",
      "Категорията не беше обновена!"
    );
  };
  const categoryMutation = useMutation({
    mutationFn: isEdit ? updateCategory : addCategory,
    onSuccess: (data) => {
      navigate("..");
    },
  });

  return (
    <>
      <TitleBar title="Категории - Редакция" />
      <GenericForm<CategoryFormType, CategoryDTO>
        onSubmit={categoryMutation.mutate}
        onCancel={() => navigate("..")}
        defaultValues={selectedItem}
        zodSchema={categoryFormSchema}
        FormFields = {CategoryFormFields}
      />
    </>
  );
}

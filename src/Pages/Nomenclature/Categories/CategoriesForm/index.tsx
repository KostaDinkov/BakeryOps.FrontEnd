import { useLocation, useNavigate } from "react-router-dom";

import TitleBar from "../../../../Components/TitleBar/TitleBar";
import { CategoryDTO } from "../../../../Types/types";
import CategoriesForm from "../../../../Components/Forms/CategoriesForm/CategoriesForm";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../../API/apiClient";
import { handleApiResponse } from "../../../../API/apiUtils";

export default function Index() {
  const location = useLocation();
  const isEdit = !!location.state;
  const { selectedItem } = location.state || {
    selectedItem: {} as CategoryDTO,
  };
  const navigate = useNavigate();
  const addCategory = async (data: CategoryDTO) => {
    await handleApiResponse(async ()=>await apiClient.POST("/api/Categories/AddCategory", data));
    console.log(data);
  };

  const updateCategory = async (data: CategoryDTO) => {
    await handleApiResponse(()=> apiClient.PUT("/api/Categories/UpdateCategory", {body:data}));
    console.log(data);
  };
  const categoryMutation = useMutation({
    mutationFn: isEdit ? updateCategory : addCategory,
    onSuccess:(data)=>{
      console.log(data);
      navigate("..");
    }
  });

  return (
    <>
      <TitleBar title="Категории - Редакция" />
      <CategoriesForm
        selectedItem={selectedItem}
        persistData={categoryMutation.mutateAsync}
        onCancel={() => navigate("..")}
      />
    </>
  );
}

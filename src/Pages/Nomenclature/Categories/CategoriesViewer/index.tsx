import { CategoryDTO } from "../../../../Types/types";
import GenericCrud2 from "../../../../Components/GenericCRUD2/GenericCrud2";
import { useCategoriesQuery } from "../../../../API/Queries/queryHooks";
import QueryViewWrapper from "../../../../Components/QueryWrapper/QueryViewWrapper";
import { useNavigate } from "react-router-dom";
import TitleBar from "../../../../Components/TitleBar/TitleBar";

export default function CategoriesPage() {
  const categoriesQuery = useCategoriesQuery();
  const navigate = useNavigate();

  return (
     <>
       <TitleBar title="Категории" />
        <QueryViewWrapper<CategoryDTO> query={categoriesQuery}>
        {(data) => (
          <GenericCrud2<CategoryDTO & { id: string }>
            items={Array.isArray(data) ? data : [data]}
            viewConfig={[{ name: { label: "Име" } }]}
            displayKeys={["name"]}
            actions={{
              edit: (selectedItem) => navigate('./update', { state: { selectedItem } }),
              delete: (selectedItem) => console.log(selectedItem),
              add: () => navigate('./create'),
            }}
          />
        )}
        </QueryViewWrapper>
     </>
  );
}

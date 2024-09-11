import styles from "./MaterialsPage.module.css";
import { Material } from "../../../Types/Material";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Category from "../../../Types/Category";
import MaterialForm from "./MaterialForm";
import { Button } from "@mui/material";
import MaterialDetails from "./MaterialDetails";
import CategoryFrom from "./CategoryFrom";
import * as materialsService from "../../../API/materialsService";
import * as categoriesService from "../../../API/categoriesService";
import * as vendorsService from "../../../API/vendorsService";
import ConfirmationDialog from "../../../Components/ConfirmationDialog/ConfirmationDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const emptyMaterial = {
  id: "",
  name: "",
  description: "",
  unit: "",
  category: {
    id: "",
    name: "",
  },
  vendor: {
    id: "",
    name: "",
  },
};

export default function MaterialsPage() {
  const queryClient = useQueryClient();

  const [deleteMaterialDialogOpen, setDeleteMaterialDialogOpen] =
    useState(false);

  const materialsQuery = useQuery({
    queryKey: ["getMaterials"],
    queryFn: materialsService.getMaterialsByCategory,
  });

  const vendorsQuery = useQuery({
    queryKey: ["getVendors"],
    queryFn: vendorsService.getVendors,
  });

  const categoriesQuery = useQuery({
    queryKey: ["getCategories"],
    queryFn: categoriesService.getCategories,
  });

  const updateMaterialMutation = useMutation({
    mutationFn: materialsService.updateMaterial,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getMaterials"] }),
  });
  const deleteMaterialMutation = useMutation({
    mutationFn: materialsService.deleteMaterial,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getMaterials"] }),
  });

  const addMaterialMutation = useMutation({
    mutationFn: materialsService.addMaterial,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getMaterials"] }),
  });

  const addCategoryMutation = useMutation({
    mutationFn: categoriesService.addCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getCategories"] }),
  })

  const [mode, setMode] = useState<
    "viewMaterial" | "updateMaterial" | "newMaterial" | "newCategory"
  >("viewMaterial");

  const [selectedMaterial, setSelectedMaterial] = useState<Material>();

  const onMaterialSubmit = (material: Material, mode: "create" | "update") => {
    if (mode === "create") {
      addMaterialMutation.mutate(material, {
        onSuccess: () => {
          setSelectedMaterial(material);
          setMode("viewMaterial");
        },
      });
    } else {
      updateMaterialMutation.mutate(material, {
        onSuccess: () => {
          setSelectedMaterial(material);
          setMode("viewMaterial");
        },
      });
    }
  };

  const onMaterialDelete = () => {
    if (selectedMaterial) {
      deleteMaterialMutation.mutate(selectedMaterial.id);
      setMode("viewMaterial");
    }
    setSelectedMaterial(undefined);
  };

  const onCategorySubmit = (category: Category) => {
    
    addCategoryMutation.mutate(category, {onSuccess: () => setMode("viewMaterial")});
    
  };

  return (
    <div className="verticalMenu">
      <h1>Стоки</h1>
      <div className={styles.twoColumnView}>
        <div className="allMaterials">
          {materialsQuery.data &&
            Object.keys(materialsQuery.data).map((categoryName) => (
              <Accordion key={categoryName} defaultExpanded>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <h3>{categoryName}</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    {materialsQuery.data[categoryName].map((material) => {
                      return (
                        <li
                          key={material.id}
                          onClick={() => setSelectedMaterial(material)}
                        >
                          {material.name}
                        </li>
                      );
                    })}
                  </ul>
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
        <div className="materialDetails">
          {(() => {
            switch (mode) {
              case "viewMaterial":
                return (
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => setMode("newCategory")}
                    >
                      Нова Категория
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setMode("newMaterial")}
                    >
                      Нова Стока
                    </Button>
                    <MaterialDetails selectedMaterial={selectedMaterial} />
                    {selectedMaterial && (
                      <div>
                        <Button
                          variant="contained"
                          onClick={() => setMode("updateMaterial")}
                        >
                          Редактирай
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            setDeleteMaterialDialogOpen(true);
                          }}
                        >
                          Изтрий
                        </Button>
                      </div>
                    )}
                  </div>
                );
              case "newMaterial":
                return (
                  <MaterialForm
                    selectedMaterial={emptyMaterial}
                    categories={categoriesQuery.data}
                    vendors={vendorsQuery.data}
                    onSubmit={onMaterialSubmit}
                  />
                );
              case "updateMaterial":
                return (
                  <MaterialForm
                    selectedMaterial={selectedMaterial}
                    categories={categoriesQuery.data}
                    vendors={vendorsQuery.data}
                    onSubmit={onMaterialSubmit}
                  />
                );
              case "newCategory":
                return <CategoryFrom onSubmit={onCategorySubmit} />;
            }
          })()}
          {mode !== "viewMaterial" && (
            <Button variant="outlined" onClick={() => setMode("viewMaterial")}>
              Откажи
            </Button>
          )}
        </div>
      </div>
      <ConfirmationDialog
        isOpen={deleteMaterialDialogOpen}
        setIsOpen={function (isOpen: boolean): void {
          setDeleteMaterialDialogOpen(isOpen);
        }}
        title={"Изтриване на стока"}
        promptText={"Сигурни ли сте, че искате да изтриете стоката"}
        agreeBtnText={"Да"}
        disagreeBtnText={"Не"}
        handleAgree={onMaterialDelete}
      />
    </div>
  );
}

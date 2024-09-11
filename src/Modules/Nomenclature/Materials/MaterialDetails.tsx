import { Material } from "../../../Types/Material";

export default function MaterialDetails({
  selectedMaterial,
}: {
  selectedMaterial: Material | undefined | null;
}) {
  return (
    <div>
      
      {selectedMaterial !== undefined ? (
        <dl>
          <dt>Име</dt>
          <dd>{selectedMaterial?.name}</dd>
          <dt>Мярка</dt>
          <dd>{selectedMaterial?.unit}</dd>
          <dt>Категория</dt>
          <dd>{selectedMaterial?.category?.name}</dd>
          <dt>Доставчик</dt>
          <dd>{selectedMaterial?.vendor?.name}</dd>
        </dl>
      ) : null}
    </div>
  );
}

export interface Material {
  id: string;
  name: string;
  description: string | null;
  unit: string;
  category: {
    id: string;
    name: string;
  };
  vendor: {
    id: string;
    name: string;
  };
}

export interface MaterialDTO {
  id: string;
  name: string;
  description: string | null;
  unit: string;
  categoryId: string;
  vendorId: string;
}

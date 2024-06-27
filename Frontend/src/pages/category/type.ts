export interface Category {
  category: string;
  color: string;
}

export interface CategoryHeaderPropsType {
  color: string;
  categoryArr: Category[];
  handleClose: () => void;
  open: boolean;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setCategoryArr: React.Dispatch<React.SetStateAction<Category[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

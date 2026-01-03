export type Shop = {
  id: string;
  name: string;
  access: string;
  address?: string;
  open?: string;
  photo?: {
    pc?: {
      s?: string;
      m?: string;
      l?: string;
    };
  };
};

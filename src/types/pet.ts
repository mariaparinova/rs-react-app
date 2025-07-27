export type Pet = {
  id: string;
  name: string;
  types: {
    animal: boolean;
    insect: boolean;
    bird: boolean;
    dog: boolean;
    cat: boolean;
  };
};

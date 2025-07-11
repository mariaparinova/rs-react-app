export interface GetPetsParams {
  name?: string;
  offset?: number;
  limit?: number;
}

export interface PetDto {
  uid: string;
  name: string;
  earthAnimal: true;
  earthInsect: false;
  avian: false;
  canine: false;
  feline: false;
}

export interface GetPetsBody {
  page: {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
  };
  sort: {
    clauses: [];
  };
  animals: PetDto[];
}

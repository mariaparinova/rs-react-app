import { Pet } from '../../types/pet.ts';

export interface GetPetsParams {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface PetDto {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
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

export interface GetPetsResult {
  totalPages: number;
  pets: Pet[];
}

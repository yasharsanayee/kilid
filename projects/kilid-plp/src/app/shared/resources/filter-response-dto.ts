import {FilterDTO} from './filter-dto';

export interface FilterResponseDTO {
  filters: FilterDTO;
  movedPermanently?: any;
  notExisted?: any;
}

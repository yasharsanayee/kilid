import {LocationDTO} from './location-dto';

export interface FilterDTO {
  locations: LocationDTO[];
  apartment: boolean;
  prpApartmentTower: boolean;
  type: string;
  subType: string;
}

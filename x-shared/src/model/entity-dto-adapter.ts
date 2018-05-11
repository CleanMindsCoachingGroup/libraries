import { Dto } from './dto';
import { Entity } from './entity';



/**
 * Entity-Data Transfer Object Adapter base class.
 */
export abstract class EntityDtoAdapter {
  abstract dtoToEntity(dto: Dto): Entity;
  abstract entityToDto(entity: Entity): Dto;
}

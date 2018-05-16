import { Entity } from './entity';



/**
 * Entity Factory base class.
 */
export abstract class EntityFactory {

  create(_parms?: any): Entity { return <Entity>undefined; }

}

import { EntityBase } from "../models/entities/entity-base";

export class NotFoundError extends Error {
  constructor(id: any[] | any,
    entityClass: new (...args: any[]) => EntityBase
  ){
    const idsMessage = Array.isArray(id) ? id.join(', ') : id;
    super(`${entityClass.name} Not Found using ID ${idsMessage}`
    )
    this.name = 'NotFoundError'
  }
}
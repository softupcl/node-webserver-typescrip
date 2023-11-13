import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repositorie";

export interface GetTodosCase{
    execute():Promise<TodoEntity[]>;

}    
export class GetTodosCase implements GetTodosCase{
       
    constructor(
      private readonly repository: TodoRepository
    ){}
       
    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll();
    }

}


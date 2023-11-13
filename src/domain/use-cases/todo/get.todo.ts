import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repositorie";

export interface GetTodoCase{
    execute(id: number):Promise<TodoEntity>;

}    
export class GetTodoCase implements GetTodoCase{
       
    constructor(
      private readonly repository: TodoRepository
    ){}
       
    execute(id:number): Promise<TodoEntity> {
        return this.repository.findById(id);
    }

}


import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repositorie";

export interface DeleteTodoCase{
    execute(id: number):Promise<TodoEntity>;

}    
export class DeleteTodoCase implements DeleteTodoCase{
       
    constructor(
      private readonly repository: TodoRepository
    ){}
       
    execute(id:number): Promise<TodoEntity> {
        return this.repository.deleteById(id);
    }

}


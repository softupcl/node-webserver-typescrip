import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repositorie";

export interface UpdateTodoCase{
    execute(dto: UpdateTodoDto): Promise<TodoEntity>;

}    
export class UpdateTodo implements UpdateTodoCase{
       
    constructor(
      private readonly repository: TodoRepository
    ){}
       
    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.repository.updateById(dto);
    }

}


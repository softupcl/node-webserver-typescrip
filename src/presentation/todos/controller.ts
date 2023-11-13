import { Request, Response } from "express"
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoRepository } from "../../domain/repositories/todo.repositorie";
import { GetTodoCase, GetTodosCase, DeleteTodoCase, CreateTodo, UpdateTodo } from "../../domain";


export class TodosController {

    constructor(
        private readonly todoRepository : TodoRepository
    ){}

    public getTodos =  (req:Request, res:Response) =>{
        new GetTodosCase(this.todoRepository)
         .execute()
         .then(todos => res.json(todos))
         .catch(error => res.status(400).json(error));
    };

    public getTodosById =  (req:Request, res:Response) =>{
        const id = +req.params.id;
        new GetTodoCase(this.todoRepository)
         .execute(id)
         .then(todos => res.json(todos))
         .catch(error => res.status(400).json(error));
    }

    public createTodo = (req:Request, res:Response) =>{

       const [error, createTodoDto] = CreateTodoDto.create(req.body);
       if(error) return res.status(400).json({error});

       new CreateTodo(this.todoRepository)
         .execute(createTodoDto!)
         .then(todos => res.json(todos))
         .catch(error => res.status(400).json({error}));
    }

    public updateTodo = (req:Request, res:Response) =>{

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({error});

        new UpdateTodo(this.todoRepository)
         .execute(updateTodoDto!)
         .then(todos => res.json(todos))
         .catch(error => res.status(400).json({error}));


    }

    public deleteTodo = async (req:Request, res:Response) =>{

        const id = +req.params.id;
        new DeleteTodoCase(this.todoRepository)
         .execute(id)
         .then(todos => res.json(todos))
         .catch(error => res.status(400).json({error}));

    }

}
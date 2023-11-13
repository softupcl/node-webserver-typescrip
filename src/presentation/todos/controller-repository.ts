import { Request, Response } from "express"
import { prisma} from '../../data/postgresql';
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoRepository } from "../../domain/repositories/todo.repositorie";


export class TodosController {

    constructor(
        private readonly todoRepository : TodoRepository
    ){}

    public getTodos = async (req:Request, res:Response) =>{
        const todos = await this.todoRepository.getAll();
        return res.json(todos);
    }

    public getTodosById = async (req:Request, res:Response) =>{
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:`Se esperaba un numero para el ID`});

        try {
             const todo = await this.todoRepository.findById(id)
             res.json(todo)
        } catch (error) {
            res.status(400).json(error);   
        }
        
    }

    public createTodo = async(req:Request, res:Response) =>{

       const [error, createTodoDto] = CreateTodoDto.create(req.body);
       if(error) return res.status(400).json({error});

       const todo= await this.todoRepository.create(createTodoDto!);
       res.json(todo);
    }

    public updateTodo = async(req:Request, res:Response) =>{

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({error});

        const updateTodo = await this.todoRepository.updateById(updateTodoDto!);
        res.json(updateTodo);


    }

    public deleteTodo = async (req:Request, res:Response) =>{

        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:`Se esperaba un numero para el ID`});

        const deleteTodo = await this.todoRepository.deleteById(id);
        res.json(deleteTodo);

    }

}
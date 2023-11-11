import { Request, Response } from "express"
import { prisma} from '../../data/postgresql';
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';


export class TodosController {

    constructor(){}

    public getTodos = async (req:Request, res:Response) =>{
        const todos = await prisma.todo.findMany();
        res.json(todos);
    }

    public getTodosById = async (req:Request, res:Response) =>{
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:`Se esperaba un numero para el ID`});

        //const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findFirst({
            where: { id },
          });

        (todo)
          ? res.json({todo})
          : res.status(404).json({error:`TODO con id ${id} no encontrado`});
    }

    public createTodo = async(req:Request, res:Response) =>{

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});

       const todo= await prisma.todo.create({
            data: createTodoDto!
       })

       res.json(todo);
    }

    public updateTodo = async(req:Request, res:Response) =>{

        const id = +req.params.id;


        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

        if(error) return res.status(400).json({error});

        const todo = await prisma.todo.findFirst({
            where: { id },
        });
        
        if(!todo) return res.status(400).json({error:`Todo con id ${id} no encontrado`});

        
        const updateTodo = await prisma.todo.update({
            where:{ id},
            data: updateTodoDto!.values
        });
        
        res.json(updateTodo);


    }

    public deleteTodo = async (req:Request, res:Response) =>{

        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:`Se esperaba un numero para el ID`});

        const todo = await prisma.todo.findFirst({
            where: { id },
        });
        if(!todo) return res.status(400).json({error:`Todo con id ${id} no encontrado`});

        const deleteTodo = await prisma.todo.delete({
            where:{id}
        }); 

        res.json(deleteTodo);
        

    }

}
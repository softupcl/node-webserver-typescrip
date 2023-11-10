import { Request, Response } from "express"

const todos = [
    {id:1, text:'Comprar leche', creado: new Date()},
    {id:2, text:'Comprar pan', creado: null},
    {id:3, text:'Comprar carne', creado: new Date()},
]

export class TodosController {

    constructor(){  
    }

    public getTodos = (req:Request, res:Response) =>{
        return res.json(todos);
    }

    public getTodosById = (req:Request, res:Response) =>{
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:`Se esperaba un numero para el ID`});

        const todo = todos.find(todo => todo.id === id);

        (todo)
          ? res.json({todo})
          : res.status(404).json({error:`TODO con id ${id} no encontrado`});
    }

    public createTodo = (req:Request, res:Response) =>{

        const {text} = req.body;
        if(!text) return res.status(400).json({error: 'Text es obligatorio'});
        const newTodo ={
            id: todos.length + 1 ,
            text: text,
            creado : null
        }

        todos.push(newTodo)
        return res.json({newTodo});
    }

    public updateTodo = (req:Request, res:Response) =>{

        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:`Se esperaba un numero para el ID`});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(400).json({error:`Todo con id ${id} no encontrado`});

        const {text, creado} = req.body;
   
        todo.text = text || todo.text;
        (creado === 'null')
            ? todo.creado = null
            : todo.creado = new Date(creado || todo.creado)

        res.json(todo);


    }

    public deleteTodo = (req:Request, res:Response) =>{

        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:`Se esperaba un numero para el ID`});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(400).json({error:`Todo con id ${id} no encontrado`});

        todos.splice(todos.indexOf(todo),1);

        res.json(todo);
        

    }

}
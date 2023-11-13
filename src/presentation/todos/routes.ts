import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImp } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodosRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";

export class TodosRoutes {

    static get routes():Router{
        const router = Router();

        const datasource = new TodoDatasourceImp();
        const todoRepository = new TodosRepositoryImpl(datasource);
        
        const todosController = new TodosController(todoRepository);

        router.get('/', todosController.getTodos );
        router.get('/:id', todosController.getTodosById );
        router.post('/', todosController.createTodo );
        router.put('/:id', todosController.updateTodo );
        router.delete('/:id', todosController.deleteTodo );

        return router;
    }

}
export class CreateTodoDto {
    constructor(
        public readonly text: string,
    ){}

    static create (props : {[key:string]:any}) : [string?, CreateTodoDto?]{
        
        const {text} = props;
        if(!text) return ['la propiedad text es requerida', undefined];

        return[undefined, new CreateTodoDto(text)];

    }    

}
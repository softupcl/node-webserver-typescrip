export class UpdateTodoDto {
    constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ){}

    get values(){
        const returnObj : {[key:string]:any} = {};
        if(this.text) returnObj.text= this.text;
        if(this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    static create (props : {[key:string]:any}) : [string?, UpdateTodoDto?]{
        
        const {id,text , completedAt} = props;
        let newcomplitedAt = completedAt;

        console.log(text);
       
        if(!id || isNaN(Number(id))){
            return ['El id deber ser un número valido', undefined];
        }

        if(completedAt){
            newcomplitedAt = new Date(completedAt);
            console.log(newcomplitedAt.toString())
            if(newcomplitedAt.toString() === 'Invalid Date'){
                return ['CompletedAt debe ser una fecha válida', undefined];
            }
        }
        return[undefined, new UpdateTodoDto(id,text, newcomplitedAt)];

    }    

}
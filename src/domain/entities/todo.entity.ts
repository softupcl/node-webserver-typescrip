export class TodoEntity{

    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date | null
    ){}

    get isCompleted(){
        return !!this.completedAt;
    }

    public static fromObject(object: {[key:string]:any}) {
        const {id, text, completedAt} = object;
        if(!id) throw 'Id es requerido';
        if(!text) throw 'text es requerido';

        let newCompletedAt;
        if(completedAt){
            newCompletedAt = new Date(completedAt);
            if(isNaN(newCompletedAt.getTime())){
             throw 'CompletedAt no es una fecha valida'
            }
        }

        return new TodoEntity(id,text, completedAt);
    }

}
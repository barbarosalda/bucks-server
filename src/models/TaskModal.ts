
export interface TaskInterface {
    id: string;
    title: string;
    description: string;
    isDone: boolean;
    date: string;
}

class Task {
    id: string;
    title: string;
    description: string;
    isDone: boolean;
    date: string;

    constructor({...args} : TaskInterface | any) {
      (this.id = args.id),
        (this.title = args.title),
        (this.description = args.description),
        (this.isDone = args.isDone);
        (this.date = args.date)
    }
  }
   
  export default Task;
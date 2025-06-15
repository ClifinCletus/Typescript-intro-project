export interface Todo{ /*this is the properties of todo, here we need to use it many where on the project, hence assigned it in a seperate file */
    id: number;
    todo:string;
    isDone: boolean;
} /*the file is .ts because just basic typescript, no react type code */


//example of implementing this state using useReducer via ts

 // type Actions =  //here the actions been done is defined. in add , we add the todo with playload as a string(todo)
 //in remove and done we would pass id to do it hence payload number
  // {type: "add",payload:string} 
  //  | {type: "remove",payload:number} 
 //   | {type: "done",payload:number}
  
//  const TodoReducer = (state: Todo[],actions: Actions) =>{
        //add the actions (look video if need)
 //    }
   //stores the Todo array as the state value 

//  import {useReducer} from 'react'

//  const ReducerExample = () => {
 //   const [state,dispatch] = useReducer(TodoReducer,[])

 //   return <div>

 // }

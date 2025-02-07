import './App.css'
import { TextArea } from 'pixel-retroui';

type Task = {
    name: string;
    details: string;
    size: string[];
};

export function TaskInput(props: { titleString: string; selectedTask: Task; selectedString: string; setFunction: any; placeholder: string}) {
    return (
        <>
            <div className='spaced-div'>{props.titleString} </div>
            <div className='spaced-div'>
                <TextArea bg="#ffffff"
                    defaultValue={props.selectedTask && props.selectedString}
                    onChange={props.setFunction}
                    placeholder={props.placeholder}
                />
            </div>
        </>
    )
}

export default TaskInput;
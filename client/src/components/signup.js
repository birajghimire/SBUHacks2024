import { useState } from 'react';
import { signupFields } from "../input_constants/formFields";
import FormAction from "./formSubmit";
import FormExtra from "./formExtraContent";
import Input from "./input";


export default function Signup(){
    const initialState = signupFields.reduce((acc, field) => {
        acc[field.id] = '';
        return acc;
    }, {});

    const [signupState, setSignupState] = useState(initialState);

    const handleChange = (e) => {
        const { id, value } = e.target; 
        setSignupState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
    }


    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                signupFields.map(field=>
                    <>
                    <br></br>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                    
                    </>
                )
                
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Signup"/>

      </form>
    )
}
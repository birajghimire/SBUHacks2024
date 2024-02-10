import { useState } from 'react';
import { loginFields } from "../input_constants/formFields";
import FormAction from "./formSubmit";
import FormExtra from "./formExtraContent";
import Input from "./input";

export default function Login(){
    //empty initial state map each k, v in the map represets an input box
    const initialState = loginFields.reduce((acc, field) => {
        acc[field.id] = '';
        return acc;
    }, {});

    const [loginState, setLoginState] = useState(initialState);

    const handleChange = (e) => {
        const { id, value } = e.target; 
        setLoginState(prevState => ({
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
                loginFields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}
import { useState } from 'react';
import React, {useNavigate} from 'react-router-dom';
import { loginFields } from "../input_constants/formFields";
import FormAction from "./formSubmit";
import FormExtra from "./formExtraContent";
import Input from "./input";
import axios from 'axios';
require('dotenv').config();
export default function Login(){
    //empty initial state map each k, v in the map represets an input box
    const initialState = loginFields.reduce((acc, field) => {
        acc[field.id] = '';
        return acc;
    }, {});

    const [loginState, setLoginState] = useState(initialState);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { id, value } = e.target; 
        setLoginState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
 
    async function handleSubmit(e) {
        e.preventDefault();
        // Since you're directly accessing the state, ensure that the `.value` is removed as it's not needed
        const email = loginState['email-address']; // Assuming loginState directly holds the value
        const password = loginState.password;
    
        console.log(email, password); // For debugging
    
        try {
            const response = await axios.post(`${process.env.API_URL}/login`, {
                email,
                password
            });
            navigate('/home')
            console.log(response.data); // Logging the response data
            // Proceed with your login logic here. For example, redirecting the user or setting auth tokens
            
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setMessage(`Login Failed: Your email or password is incorrect`);
            setIsError(true);
            // Handle errors here, such as displaying a message to the user
        }
    }
// signup user, salt and hash the pw, after that direct to login, 
// when they login, check again salt and hash, middleware -> make sure the user is authenticated, 
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
        {isError && (
            <div className="text-red-500 text-sm mt-2">
                {message}
            </div>
        )}

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}
import React, {useNavigate} from 'react-router-dom';
import { useState} from 'react';
import { signupFields } from "../input_constants/formFields";
import FormAction from "./formSubmit";
import FormExtra from "./formExtraContent";
import Input from "./input";
import axios from 'axios';
require('dotenv').config();

export default function Signup(){
    const initialState = signupFields.reduce((acc, field) => {
        acc[field.id] = '';
        return acc;
    }, {});

    const [signupState, setSignupState] = useState(initialState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target; 
        setSignupState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        // Directly accessing state values, assuming signupState is correctly set up
        const username = signupState['username'];
        const email = signupState['email-address'];
        const password = signupState['password'];
        const confirmPassword = signupState['confirm-password'];
    
        console.log(username, email, password, confirmPassword); // Debugging: Ensure these values are correct
    
        try {
            const result = await axios.post(`${process.env.API_URL}/register`, {
                username,
                email,
                password,
                confirmPassword
            });

            navigate('/')
    
            console.log(result.data); // Axios wraps the response in a data property
        } catch (error) {
            console.error('There was an error with the signup request:', error.response ? error.response.data : error.message);
        }
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
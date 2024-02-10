import Signup from '../components/signup';
import Header from '../components/header';

export default function SignupPage(){
    return (
        <div className="grid grid-cols-2 min-h-screen">
            <div className="h-full">
                <div id="book" className="absolute grayscale hover:grayscale-0 h-screen w-1/2 left-0 bg-white overflow-hidden"> 
                    <img className="h-full scale-125 hover:scale-150 hover:rotate-0 transition ease-in-out duration-300 delay-250" src="magic_book.jpg"/>
                </div>
            </div>

            <div className="flex justify-center items-center bg-white">
                <div className="max-w-md w-full px-10 py-8"> 
                <Header 
                    heading="Sign Up"
                    paragraph="Already have an account?"
                    linkName="Login"
                    linkUrl="/"/>
                <Signup/>
                </div>
            </div>
        </div>
    )
}



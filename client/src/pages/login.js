import Header from "../components/header"
import Login from "../components/login"

export default function LoginPage() {
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
                        heading="Login"
                        paragraph="Don't have an account yet? "
                        linkName="Sign Up"
                        linkUrl="/signup"
                    />
                    <Login />
                </div>
            </div>
        </div>
    )
}



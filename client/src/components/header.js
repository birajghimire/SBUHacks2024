import {Link} from 'react-router-dom';
import Typewriter from 'typewriter-effect';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl,
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
            <div className="font-pacifico text-center py-8 text-5xl text-black">
                        <Typewriter
                        onInit={(typewriter) => {
                            typewriter.typeString('MindScribe')
                            .callFunction(() => {
                                console.log('String typed out!');
                            })
                            .pauseFor(2500)
                            .deleteAll()
                            .callFunction(() => {
                                console.log('All strings were deleted');
                            })
                            .start();
                        }}
                        options={{
                            loop:true
                        }}
                        />
                    </div>
            </div>
            <h2 className="font-amatic-sc underline text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="font-protest-riot mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-protest-riot text-blue-600 hover:text-blue-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}
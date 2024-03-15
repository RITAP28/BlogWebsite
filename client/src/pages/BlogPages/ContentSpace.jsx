import React from "react";
// import TipTapEditor from "../../components/TipTapEditor";
// import '../../App.css'
// import {TipTapEditor} from '../../components/TipTapEditor'


const ContentSpace = ({setDraft}) => {
    function handleChange(){
        setDraft(true);
    }
    return (
        <div>
            {/* Title */}
            <div className="py-4">
                <input 
                    type="text" 
                    className="pl-2 py-4 text-3xl font-bold font-Kanit w-full" 
                    placeholder="Title"
                    onChange={handleChange}
                />
            </div>
            {/* Content */}
            <div className="">
                {/* <TipTapEditor /> */}
                <textarea 
                    name="" 
                    id="" 
                    className="w-full pl-2 py-4 font-sans text-lg h-screen" placeholder="Write Here"
                    onChange={handleChange}
                />
            </div> 
        </div>
    );
};

export default ContentSpace;
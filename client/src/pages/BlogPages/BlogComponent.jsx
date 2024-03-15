import React from 'react';
// import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

const Component = () => {
    return (
        <>
        {/* // <NodeViewWrapper className="react-component-with-content"> */}
            <div className='blog-view'>
                {/* Title input */}
                <div className="">
                    <input type="text" className='border' placeholder='Title' />
                </div>
                {/* Content input */}
                <div className="">
                    <textarea name="blogText" className='' placeholder='Type your IDEA!' />
                </div>
            </div>

            {/* <NodeViewContent className='content' /> */}
        {/* </NodeViewWrapper> */}
        </>
    )
}

export default Component;
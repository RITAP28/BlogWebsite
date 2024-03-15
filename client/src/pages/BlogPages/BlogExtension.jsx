import React from "react";
import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Component from "./BlogComponent";
import { mergeAttributes } from '@tiptap/core'

export default Node.create({
    name: 'reactComponent',
    group: 'block',
    content: 'inline*',
    parseHTML() {
        return [
            {
                tag: 'react-component',
            }
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return [
            'react-component',
            mergeAttributes(HTMLAttributes),
            0
        ]
    },
    addNodeView() {
        return ReactNodeViewRenderer(Component)
    }
});

import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';

const Editor = ({...props}, onChange, data) => {

    return (
        <div className="editor_box">
            <CKEditor
                editor={ ClassicEditor }
                config={{
                    language: "ko",
                    placeholder: "내용을 입력하세요.",
                    toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        'blockQuote',
                        '|',
                        'undo',
                        'redo',
                    ],
                }}
                data={data || ''}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={onChange}
                {...props}
            />
        </div>
    )
}

export default Editor;
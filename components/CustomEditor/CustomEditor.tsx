'use client'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo,
    Code, Image, ImageInsert
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

interface CustomEditorProps {
    setFieldValue: (field: string, value: any) => void;
}

const CustomEditor: React.FC<CustomEditorProps> = ({ setFieldValue }) => {
    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        setFieldValue('content', data);
    };
    return (
        <CKEditor
            editor={ClassicEditor}
            onChange={handleEditorChange}
            config={{
                toolbar: {
                    items: [
                        'undo', 'redo', '|', 'bold', 'italic', '|',
                        'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'code', 'image', 'insertImage'
                    ]
                },
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo,
                    Code, Image, ImageInsert,
                ],
                licenseKey: 'WVZQTUkrVFJZbGl4N3NqSE5rQVFPWWVhWG03R1hTNllEbUhoQWVUTklUMks1bHpGZEZMa0VoREt6REJ3Z0E9PS1NakF5TkRFd01ETT0=',
                initialData: '<p>Start creating your new post!</p>'
            }}
        />
    );
}

export default CustomEditor;

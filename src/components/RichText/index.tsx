import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './richtext.scss';
interface IProps {
  value: any
  onChange: any
  noImage?: boolean
}
function RichText({ value, onChange, noImage }: IProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };
  const format = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];
  return (
    <>
      {
        noImage
          ? <ReactQuill theme="snow" value={value} onChange={onChange} />
          : <ReactQuill theme="snow" modules={modules} formats={format} value={value} onChange={onChange} className='richtext'/>
      }
    </>
  );
}

export default RichText;

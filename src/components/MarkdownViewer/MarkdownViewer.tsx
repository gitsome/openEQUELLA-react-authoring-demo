import React, { useEffect, useState } from 'react';
import unified from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';

export interface IMarkdownViewerProps {
  children?: React.ReactNode;
  contents: string;
}

const MarkdownViewer: React.FC<IMarkdownViewerProps> = ({contents}) => {

  const [ markdownConverted, setMarkdownConverted ] = useState('<div></div>');

  useEffect(() => {
    unified()
      .use(markdown)
      .use(html)
      .process(contents, function(err, file) {
        if (err) throw err
        setMarkdownConverted(String(file));
      });
  }, [contents]);


  return (
    <div className="markdown-viewer markdown-body" dangerouslySetInnerHTML={{__html: markdownConverted}}></div>
  );
};

export default MarkdownViewer;

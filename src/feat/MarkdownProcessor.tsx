import React, { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';

type MarkdownProcessorProps = {
    actionButtons: React.ReactNode[];
    markdown: string;
};

const MarkdownProcessor = forwardRef<HTMLDivElement, MarkdownProcessorProps>(
    ({ actionButtons, markdown }, ref) => (
        <div className="markdown-response" ref={ref}>
            <div className="chat-bubble-pfpspacer" />
            <div className="markdown-response-content">
                <div className="chat-bubble-message markdown-content">
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
                {actionButtons.length > 0 ? (
                    <div className="markdown-response-actions">
                        {actionButtons}
                    </div>
                ) : null}
            </div>
        </div>
    ),
);

MarkdownProcessor.displayName = 'MarkdownProcessor';

export default MarkdownProcessor;

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Highlight as SyntaxHighlighter, themes } from 'prism-react-renderer';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

import './markdown-renderer.css';

interface MarkdownRendererProps {
	content: string;
	className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
	return (
		<div className={`markdown-renderer ${className} dark`}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw, rehypeSanitize]}
				components={{
					code({ className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || '');
						return match ? (
							<SyntaxHighlighter
								style={themes.dracula}
								language={match[1]}
								code={children?.toString() || ''}
								theme={themes.dracula}
								{...props}
							>
								{({ style, tokens, getLineProps, getTokenProps }) => (
									<pre style={style}>
										{tokens.map((line, i) => (
											<div
												key={i}
												{...getLineProps({ line })}
											>
												{line.map((token, key) => (
													<span
														key={key}
														{...getTokenProps({ token })}
													/>
												))}
											</div>
										))}
									</pre>
								)}
							</SyntaxHighlighter>
						) : (
							<code
								className={className}
								{...props}
							>
								{children}
							</code>
						);
					},
					table({ children }) {
						return (
							<div className='table-wrapper'>
								<table className='markdown-table'>{children}</table>
							</div>
						);
					},
					a({ children, ...props }) {
						return (
							<a
								target='_blank'
								rel='noopener noreferrer'
								{...props}
							>
								{children}
							</a>
						);
					},
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};

export default MarkdownRenderer;

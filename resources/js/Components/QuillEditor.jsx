import React, { useEffect, useRef } from 'react';

export default function QuillEditor({
    value = '',
    onChange,
    placeholder = 'Write your full blog post content here...'
}) {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        // Ensure Quill CSS is loaded
        if (!document.getElementById('quill-snow-theme-css')) {
            const link = document.createElement('link');
            link.id = 'quill-snow-theme-css';
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css';
            document.head.appendChild(link);
        }

        const loadAndInit = async () => {
            if (!window.Quill) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js';
                    script.async = true;
                    script.onload = () => resolve();
                    script.onerror = () => reject(new Error('Failed to load Quill script'));
                    document.head.appendChild(script);
                });
            }

            if (!isMounted || !editorRef.current || quillRef.current) return;

            const quill = new window.Quill(editorRef.current, {
                theme: 'snow',
                placeholder: placeholder,
                modules: {
                    toolbar: [
                        [{ header: [2, 3, 4, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                        ['clean']
                    ]
                }
            });

            quillRef.current = quill;

            if (value) {
                quill.root.innerHTML = value;
            }

            quill.on('text-change', () => {
                const html = quill.root.innerHTML === '<p><br></p>' ? '' : quill.root.innerHTML;
                if (onChange) {
                    onChange(html);
                }
            });
        };

        loadAndInit();

        return () => {
            isMounted = false;
        };
    }, []);

    // Sync external value changes if modified externally
    useEffect(() => {
        if (quillRef.current) {
            const currentContent = quillRef.current.root.innerHTML === '<p><br></p>' ? '' : quillRef.current.root.innerHTML;
            if (value !== currentContent && value !== undefined) {
                quillRef.current.root.innerHTML = value || '';
            }
        }
    }, [value]);

    return (
        <div className="rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-md focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <div ref={editorRef} />
            <style dangerouslySetInnerHTML={{__html: `
                /* Toolbar Dark Theme */
                .ql-toolbar.ql-snow {
                    border: none !important;
                    border-bottom: 1px solid #334155 !important;
                    background-color: #1e293b !important;
                    padding: 10px 14px !important;
                }
                .ql-toolbar.ql-snow .ql-stroke {
                    stroke: #94a3b8 !important;
                }
                .ql-toolbar.ql-snow .ql-fill {
                    fill: #94a3b8 !important;
                }
                .ql-toolbar.ql-snow .ql-picker {
                    color: #cbd5e1 !important;
                }
                .ql-toolbar.ql-snow .ql-picker-options {
                    background-color: #1e293b !important;
                    border: 1px solid #334155 !important;
                    color: #f1f5f9 !important;
                    border-radius: 8px !important;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
                }
                .ql-toolbar.ql-snow button:hover .ql-stroke,
                .ql-toolbar.ql-snow button.ql-active .ql-stroke,
                .ql-toolbar.ql-snow .ql-picker-label:hover .ql-stroke {
                    stroke: #38bdf8 !important;
                }
                .ql-toolbar.ql-snow button:hover .ql-fill,
                .ql-toolbar.ql-snow button.ql-active .ql-fill {
                    fill: #38bdf8 !important;
                }

                /* Editor Container & Scrollable Area */
                .ql-container.ql-snow {
                    border: none !important;
                    background-color: #0f172a !important;
                    color: #f8fafc !important;
                    font-size: 15px !important;
                    font-family: inherit !important;
                    height: 400px !important;
                    max-height: 400px !important;
                }
                .ql-editor {
                    height: 100% !important;
                    max-height: 100% !important;
                    overflow-y: auto !important;
                    line-height: 1.7 !important;
                    color: #f8fafc !important;
                    padding: 16px 20px !important;
                }
                .ql-editor.ql-blank::before {
                    color: #64748b !important;
                    font-style: normal !important;
                    left: 20px !important;
                }

                /* Strip copy-pasted inline white backgrounds and black text colors inside editor */
                .ql-editor * {
                    background-color: transparent !important;
                }
                .ql-editor p, .ql-editor span, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor li {
                    background-color: transparent !important;
                }
                .ql-editor span[style*="color"], .ql-editor p[style*="color"] {
                    color: inherit !important;
                }

                /* Custom Slim Dark Scrollbar */
                .ql-editor::-webkit-scrollbar {
                    width: 7px;
                }
                .ql-editor::-webkit-scrollbar-track {
                    background: #0f172a;
                }
                .ql-editor::-webkit-scrollbar-thumb {
                    background: #334155;
                    border-radius: 9999px;
                }
                .ql-editor::-webkit-scrollbar-thumb:hover {
                    background: #475569;
                }
            `}} />
        </div>
    );
}

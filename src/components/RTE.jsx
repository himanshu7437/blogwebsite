import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf';

export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block pl-1 mb-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        apiKey={conf.appwriteTinyMce}
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            forced_root_block: 'p',
            force_br_newlines: false,
            br_in_pre: false,
            
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
                "paste" // Make sure paste plugin is included
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: `
                body { 
                    font-family: Helvetica, Arial, sans-serif; 
                    font-size: 14px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    hyphens: auto;
                }
                * {
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                }
                pre, code {
                    white-space: pre-wrap;
                    word-break: break-all;
                }
                table {
                    width: 100%;
                    table-layout: fixed;
                }
                td, th {
                    word-break: break-word;
                }
                .mce-content-body {
                    overflow-wrap: break-word;
                    word-break: break-word;
                }
            `,
            // Paste handling configuration
            paste_as_text: true, // Force pasting as plain text
            paste_block_drop: true,
            paste_data_images: false,
            paste_preprocess: function(plugin, args) {
                // Clean up pasted content - remove pre tags
                args.content = args.content.replace(/<pre[^>]*>/gi, '<p>').replace(/<\/pre>/gi, '</p>');
            },
            paste_postprocess: function(plugin, args) {
                // Ensure all content is wrapped in paragraphs after pasting
                const node = args.node;
                if (node && node.nodeName === 'PRE') {
                    const p = plugin.editor.dom.create('p', null, node.innerHTML);
                    plugin.editor.dom.replace(p, node);
                }
            },
            // Setup to handle any remaining pre tags
            setup: function(editor) {
                editor.on('PostProcess', function(e) {
                    if (e.content) {
                        // Convert any pre tags to paragraphs in the final content
                        e.content = e.content.replace(/<pre[^>]*>(.*?)<\/pre>/gis, function(match, content) {
                            return '<p>' + content.replace(/<br\s*\/?>/gi, '\n') + '</p>';
                        });
                    }
                });
                
                editor.on('GetContent', function(e) {
                    if (e.format !== 'raw') {
                        // Ensure final content doesn't have pre tags
                        e.content = e.content.replace(/<pre[^>]*>(.*?)<\/pre>/gis, '<p>$1</p>');
                    }
                });
            }
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}
// Compatibility entry point; the preview server owns path handling and MIME types.
process.argv[2] ||= '8080';
await import('../book/serve.mjs');

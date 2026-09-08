// DEPRECATED: superseded by book/build/ (see book/build/book.mjs).
// Kept as a thin shim until Phase-12 archival. Run: npm run build:book
console.warn("book/build-manifest.mjs is deprecated; delegating to book/build/book.mjs");
await import("./build/book.mjs");

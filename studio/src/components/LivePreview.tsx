interface LivePreviewProps {
  selectedChapter: string | null;
  selectedRecord: string | null;
}

export function LivePreview({ selectedChapter, selectedRecord }: LivePreviewProps) {
  if (!selectedChapter && !selectedRecord) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-lg font-semibold text-gray-300">MAT Studio</h3>
          <p className="text-sm mt-2">Select a record from the Book Tree to begin.</p>
          <p className="text-xs mt-4 text-gray-500">
            Preview chapters, inspect data, and prepare publications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 text-center text-gray-500">
          <div className="text-3xl mb-3">🔬</div>
          <p className="text-sm">
            {selectedChapter
              ? `Preview: ${selectedChapter}`
              : `Record: ${selectedRecord}`}
          </p>
          <p className="text-xs mt-2 text-gray-400">
            Live chapter preview will render here from canonical MAT data.
          </p>
        </div>
      </div>
    </div>
  );
}

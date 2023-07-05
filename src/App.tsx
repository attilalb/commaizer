import { ChangeEvent, useState } from 'react';

type FileEvent = ChangeEvent<HTMLInputElement>;

const CsvConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedContent, setParsedContent] = useState<string | null>(null);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);

  const handleFileChange = (event: FileEvent) => {
    const selectedFile = event.target.files![0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const content = event.target!.result as string;
      setParsedContent(content);
      setFile(selectedFile);
    };
    reader.readAsText(selectedFile, 'UTF-8');
  };

  const handleConvertClick = () => {
    if (file) {
      const replacedContent = parsedContent!.replace(/;/g, ',');
      const blob = new Blob([replacedContent], {
        type: 'text/csv;charset=utf-8;',
      });
      setConvertedFile(blob);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 tracking-widest">Commaizer</h1>
        <p className="text-lg mb-4">
          Replace semicolons with commas in .csv files.
        </p>
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-800 font-bold mb-2">
            Choose a .CSV file to convert
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="w-full border border-gray-300 p-2 rounded-lg"
            onChange={handleFileChange}
          />
        </div>
        {parsedContent && (
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Parsed Content:</h2>
            <pre>{parsedContent}</pre>
          </div>
        )}
        <button
          className="w-full rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
          onClick={handleConvertClick}
          disabled={!file}
        >
          Convert
        </button>
        {convertedFile && (
          <div className="mt-4 text-center">
            <a
              href={URL.createObjectURL(convertedFile)}
              download="converted.csv"
              className="text-blue-500 font-bold underline"
            >
              Download Converted File
            </a>
          </div>
        )}
      </div>
      <footer className="mx-auto mt-4">
        <p className="text-sm">
          Made with ❤ by{' '}
          <a href="https://github.com/attilalb/" className="font-bold">
            AttilaLB
          </a>{' '}
        </p>
      </footer>
    </div>
  );
};

export default CsvConverter;

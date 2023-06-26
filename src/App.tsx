import { SetStateAction, useState } from 'react';

const CsvConverter = () => {
  const [file, setFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);

  const handleFileChange = (event: {
    target: { files: SetStateAction<null>[] };
  }) => {
    setFile(event.target.files[0]);
  };

  const handleConvertClick = () => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const content = event.target.result;
      const replacedContent = content.replace(/;/g, ',');
      const blob = new Blob([replacedContent], { type: 'text/csv' });
      setConvertedFile(blob);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">CSV Converter</h1>
        <p className="text-lg mb-4">Replace semicolons with commas in .csv files.</p>
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
            >
              Download Converted File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvConverter;

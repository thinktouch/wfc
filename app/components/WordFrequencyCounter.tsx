'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WordFrequencyCounter() {
  const [text, setText] = useState('');
  const [excludeWords, setExcludeWords] = useState('');
  const [wordCount, setWordCount] = useState<{[key: string]: number}>({});

  const countWords = () => {
    const words = text.match(/\b(\w+)\b/g) || [];
    const excludeList = excludeWords.split(',').map(word => word.trim().toLowerCase());
    const count: {[key: string]: number} = {};

    words.forEach(word => {
      word = word.toLowerCase();
      if (!excludeList.includes(word)) {
        count[word] = (count[word] || 0) + 1;
      }
    });

    setWordCount(count);
  };

  const excludeWord = (word: string) => {
    setExcludeWords(prev => prev ? `${prev}, ${word}` : word);
    countWords();
  };

  const downloadResults = () => {
    let results = 'No.,Word,Frequency\n';
    Object.entries(wordCount).sort((a, b) => b[1] - a[1]).forEach(([word, freq], index) => {
      results += `${index + 1},"${word}",${freq}\n`;
    });

    const blob = new Blob([results], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'word-frequency-results.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        value={excludeWords}
        onChange={(e) => setExcludeWords(e.target.value)}
        placeholder="Enter words to exclude, separated by commas"
        className="w-full p-2 mb-2 border rounded"
      />
      <Link 
        href="/data/exclude.txt" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block mb-4 text-blue-600 hover:underline"
      >
        View exclude simple words list
      </Link>
      <div className="button-container">
        <button onClick={countWords}>Count Words</button>
        <button className="download-button" onClick={downloadResults}>Download Results</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Word</th>
            <th>Frequency</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(wordCount)
            .sort((a, b) => b[1] - a[1])
            .map(([word, freq], index) => (
              <tr key={word}>
                <td>{index + 1}</td>
                <td>{word}</td>
                <td>{freq}</td>
                <td>
                  <button className="exclude-button" onClick={() => excludeWord(word)}>
                    Exclude
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
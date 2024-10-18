'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function WordFrequencyCounter() {
  const [text, setText] = useState('');
  const [excludeWords, setExcludeWords] = useState('');
  const [wordCount, setWordCount] = useState<{[key: string]: number}>({});

  useEffect(() => {
    countWords();
  }, [excludeWords, text]);

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
      <Head>
        <meta name="description" content="Efficient online word frequency counter tool. Easily analyze word occurrences in texts. Supports word exclusion, ideal for writing, SEO optimization, and language learning." />
        {/* 添加Google Analytics代码 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-38M0ZW2PTC"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-38M0ZW2PTC');
          `}
        </script>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Smart Word Frequency Counter - Your Text Analysis Companion</h1>
      <p className="mb-4">Our Word Frequency Counter is a powerful online text analysis tool designed for writers, SEO specialists, language learners, and data analysts. It quickly and accurately calculates the frequency of words in any given text, helping you gain deep insights into text structure and keyword distribution.</p>
      
      <h2 className="text-xl font-semibold mb-2">Key Features:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Instant Statistics: Get word frequency results immediately after inputting text</li>
        <li>Exclusion Function: Flexibly exclude common or irrelevant words to focus on important content</li>
        <li>User-Friendly: Clean and intuitive interface for easy operation</li>
        <li>Multi-Scenario Application: Suitable for content creation, SEO optimization, language learning, and more</li>
        <li>Free to Use: No registration required, use anytime, anywhere</li>
      </ul>
      
      <p className="mb-4">Whether you need to optimize website content, analyze literary works, or learn a new language, our Word Frequency Counter tool provides valuable insights. Try it now and boost your text analysis efficiency!</p>

      <hr className="my-8 border-t border-gray-300" />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="w-full p-2 mb-4 border rounded text-gray-900 bg-white"
      />
      <input
        type="text"
        value={excludeWords}
        onChange={(e) => setExcludeWords(e.target.value)}
        placeholder="Enter words to exclude, separated by commas"
        className="w-full p-2 mb-2 border rounded text-gray-900 bg-white"
      />
      <Link 
        href="/data/exclude.txt" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block mb-4 text-blue-600 hover:underline"
      >
        View exclude words list
      </Link>
      <div className="button-container flex flex-col sm:flex-row gap-2 mb-4">
        <button onClick={countWords} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Count Words</button>
        <button onClick={downloadResults} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Download Results</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-white text-gray-900">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">No.</th>
              <th className="p-2 border border-gray-300">Word</th>
              <th className="p-2 border border-gray-300">Frequency</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(wordCount)
              .sort((a, b) => b[1] - a[1])
              .map(([word, freq], index) => (
                <tr key={word} className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-gray-900">{index + 1}</td>
                  <td className="p-2 border border-gray-300 text-gray-900">{word}</td>
                  <td className="p-2 border border-gray-300 text-gray-900">{freq}</td>
                  <td className="p-2 border border-gray-300">
                    <button 
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600" 
                      onClick={() => excludeWord(word)}
                    >
                      Exclude
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

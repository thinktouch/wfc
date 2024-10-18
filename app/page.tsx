import type { Metadata } from "next";
import WordFrequencyCounter from './components/WordFrequencyCounter';

export const metadata: Metadata = {
  title: "Word Frequency | Home",
  description: "Analyze text with word frequency counting tool",
};

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4 bg-gray-100">
      <div className="w-full max-w-6xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center mb-6">Word Frequency Counter</h1>
        <WordFrequencyCounter />
      </div>
    </div>
  );
}

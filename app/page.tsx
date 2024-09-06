import WordFrequencyCounter from './components/WordFrequencyCounter';

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4 bg-gray-100">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center mb-6">词频统计器</h1>
        <WordFrequencyCounter />
      </div>
    </div>
  );
}

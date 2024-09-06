import WordFrequencyCounter from './components/WordFrequencyCounter';

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container">
        <h1 className="text-2xl font-bold text-center mb-6">词频统计器</h1>
        <WordFrequencyCounter />
      </div>
    </div>
  );
}

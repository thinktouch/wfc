import WordFrequencyCounter from './components/WordFrequencyCounter.tsx';

export default function Home() {
  return (
    <div className="container">
      <h1>词频统计器</h1>
      <WordFrequencyCounter />
    </div>
  );
}

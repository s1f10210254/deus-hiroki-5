import type { Riddle } from '$/api/@types';
import { useAtom } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [riddles, setRiddles] = useState<Riddle[]>();
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const inputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const inputQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };
  const inputAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };
  const fetchRiddles = async () => {
    const riddles = await apiClient.api.public.riddles.$get().catch(returnNull);

    if (riddles !== null) setRiddles(riddles);
  };
  const createRiddle = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !question || !answer) return;

    await apiClient.api.private.riddles
      .$post({ body: { title, question, answer } })
      .catch(returnNull);
    setTitle('');
    setQuestion('');
    setAnswer('');
    await fetchRiddles();
  };

  useEffect(() => {
    fetchRiddles();
  }, [user?.id]);

  if (!riddles) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1>Riddles</h1>
      <div>
        {user && (
          <form onSubmit={createRiddle}>
            <input type="text" placeholder="Title" value={title} onChange={inputTitle} />
            <input type="text" placeholder="Question" value={question} onChange={inputQuestion} />
            <input type="text" placeholder="Answer" value={answer} onChange={inputAnswer} />
            <button type="submit">Create Riddle</button>
          </form>
        )}
        <ul>
          {riddles.map((riddle) => (
            <li key={riddle.id}>
              <h2>{riddle.title}</h2>
              <p>{riddle.question}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

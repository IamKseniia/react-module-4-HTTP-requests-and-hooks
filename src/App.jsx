import 'modern-normalize';
import { useState, useMemo, useRef, useEffect } from 'react';
import ArticleList from './components/ArticleList.jsx';
import { fetchArticlesWithTopic } from './articles-api.js';
import { SearchForm } from './components/SearchForm.jsx';
import Error from './components/Error.jsx';
import Loader from './components/Loader.jsx';
import Player from './components/Player.jsx';
import { UserMenu } from './UserMenu';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async topic => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const [planets, setPlanets] = useState(['Earth', 'Mars', 'Jupiter', 'Venus']);
  const [query, setQuery] = useState('');
  const [clicks, setClicks] = useState(0);

  const filteredPlanets = useMemo(
    () => planets.filter(planet => planet.includes(query)),
    [planets, query]
  );

  // const [value, setValue] = useState(0);
  // const btnRef = useRef();

  // // Буде undefined на першому рендері
  // // і посиланням на DOM-елемент всі наступні
  // // console.log('App: ', btnRef.current);

  // useEffect(() => {
  //   // Ефект виконується після монтування,
  //   // тому завжди буде посиланням на DOM-елемент
  //   console.log('useEffect: ', btnRef.current);
  // });

  // const handleClick = () => {
  //   // Кліки будуть після монтування,
  //   // тому завжди буде посиланням на DOM-елемент
  //   console.log('handleClick: ', btnRef.current);
  // };

  const valueRef = useRef(0);

  useEffect(() => {
    // Виконається лише один раз під час монтування.
    // Наступні оновлення значення рефа не
    // викличуть оновлення компонента
    console.log(valueRef.current);
  });

  const handleClick = () => {
    valueRef.current += 1;
  };

  return (
    <div>
      <h1>Latest articles</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <Error />}
      {articles.length > 0 && <ArticleList items={articles} />}
      <button onClick={() => setClicks(clicks + 1)}>
        Number of clicks: {clicks}
      </button>
      <ul>
        {filteredPlanets.map(planet => (
          <li key={planet}>{planet}</li>
        ))}
      </ul>
      {/* <button onClick={() => setValue(value + 1)}>
        Update value to trigger re-render
      </button>
      <button ref={btnRef} onClick={handleClick}>
        Button with ref
      </button> */}
      <button onClick={handleClick}>Click to update ref value</button>
      <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />

      <h1>Context example</h1>
      <UserMenu />
    </div>
  );
};

export default App;

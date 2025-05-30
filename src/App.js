import './App.css';

import {
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './Components/Navbar';
import NewsComponent from './Components/NewsComponent';

export default function App() {
const api = process.env.REACT_APP_NEWS_API; 

 
  return (
    <div>
      <Navbar />
   
      <Routes>
        <Route exact path="/sports" element={<NewsComponent pageSize={6} key="sports" country="us"  category="sports" api={api} />} />
        <Route exact path="/entertainment" element={<NewsComponent pageSize={6} key="entertainment" country="us"  category="entertainment" api={api}/>} />
        <Route exact path="/technology" element={<NewsComponent pageSize={6} key="technology" country="us"  category="technology" api={api} />} />
        <Route exact path="/science" element={<NewsComponent pageSize={6} key="science" country="us"  category="science" api={api} />} />
        <Route exact path="/health" element={<NewsComponent pageSize={6} key="health" country="us"  category="health" api={api} />} />
        <Route exact path="/business" element={<NewsComponent pageSize={6} key="business" country="us"  category="business" api={api} />} />
        <Route exact path="/" element={<NewsComponent pageSize={6} key="general" country="us"  category="general" api={api} />} />
      </Routes>
    </div>
  );
}

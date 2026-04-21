import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './pages/MainLayout';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import AdminPosts from './pages/AdminPosts';
import AdminTags from './pages/AdminTags';
import About from './pages/About';
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/post/:slug' component={PostDetail} />
          <Route path='/admin/posts' component={AdminPosts} />
          <Route path='/admin/tags' component={AdminTags} />
		  <Route path='/about' component={About}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
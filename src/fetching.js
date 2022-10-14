import { useEffect, useState } from "react";
import axios from 'axios'
function App() {
  const [posts, setPosts] = useState( [] );
  const axiosPosts = async () => {
    const response = await axios('http://localhost:8080/musics');
    setPosts(response.data);
  };
  useEffect(() => {
    axiosPosts();
  }, []);


  return (
    <>
      <div className="axioscontainer">
         {posts.map((post) => (
          <div key={post.id}>
          <h3>{post.id}</h3>
          <h4>{post.singer}</h4>
          <p>{post.name}</p>
        </div> 
         ))}
      </div>
    </>
  );
}

export default App;

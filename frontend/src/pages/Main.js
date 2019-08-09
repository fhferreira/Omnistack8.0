import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import './Main.css';

import api from '../services/api';

export default function Main({match}) {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        async function loadUsers() {
            const response = await api.get('/devs', {
              headers: { user: match.params.id }
            });
            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id]);

    async function handleLike(_id)
    {
      await api.post(`/devs/${_id}/likes`, null, {
        headers: { user: match.params.id }
      });

      setUsers(users.filter(user => user._id !== _id));
    }

    async function handleDislike(_id)
    {
      await api.post(`/devs/${_id}/dislikes`, null, {
        headers: { user: match.params.id }
      });

      setUsers(users.filter(user => user._id !== _id));
    }
    
    return (
        <div className="main-container">
          <Link to="/">
            <img src={logo} alt="Tindev"/>
          </Link>
          {users.length > 0 ? (
            <ul>
            {users.map(user => (
               <li key={user._id}>
                  <img src={user.avatar} alt="" />
                  <footer>
                      <strong>{user.name}</strong>
                      <p>{user.bio}</p>
                  </footer>
                  <div className="buttons">
                      <button 
                      onClick={() => handleDislike(user._id)}
                      type="button">
                        <img src={dislike} alt="Dislike"/>
                      </button>
                      <button onClick={() => handleLike(user._id)} type="button">
                        <img src={like} alt="Like" />
                      </button>
                  </div>
              </li> 
            ))}
          </ul>
          ) : (
            <div className='empty'>Acabou :(</div>
          )}
          
        </div>
      );
}
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from '../api/posts';
import AddPost from '../components/AddPost';

const PostLists = () => {

    const navigate = useNavigate();

    const { isLoading, isError, data: posts = [], error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts
    });

    console.log('post fetch')
    console.log(posts)
    if(isLoading) return 'loading...' ;
    if(isError) return `Error: ${error.message}`;


    return (
        <div>
            <AddPost />
          <div>
            {/* for some reason useQuery data causes weird error - Array.isArray(posts) && solves this */}
            {Array.isArray(posts) &&
            posts.map( post => (
            <div key={post.id} style={{background: "#696"}}>
                <h4 style={{cursor: "pointer"}} onClick={() => navigate(`/post/${post.id}`)}>{post.title}</h4>
                <button onClick={() => navigate(`/post/${post.id}/edit`)}>Edit</button>
                <button>Delete</button>
            </div>
            ))
        }
            </div>
        </div>
    )
}

export default PostLists;
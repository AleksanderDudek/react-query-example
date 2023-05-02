import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { createPost } from '../api/posts';
import PostForm from './PostForm';
import { v4 as uuidv4 } from 'uuid';

const AddPost = () => {
    const queryClient = useQueryClient();

    const { mutate, isError, isLoading} = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts']})
            console.log('success')
        }
    })

    const handleAddPost = (post) => {
        mutate({
            id: uuidv4(), 
            ...post
        });
    }

    return (
        <div>
            <h3>Add new Post</h3>
            <PostForm onSubmit={handleAddPost} initialValue={{ title: "", body: ""}}/>
        </div>
    )
}

export default AddPost;
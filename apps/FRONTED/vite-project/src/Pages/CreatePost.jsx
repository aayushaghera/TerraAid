
import Post from '../CreatePost/Post'; // Renamed import
import { Divider } from '@mantine/core';

function CreatePost() {
    return (
        <div className="min-h-screen bg-mine-shaft-950 font-['poppins']">
            <Divider color="#5a5a5a" size="xs" mx="md" />
            <Post /> 
            
        </div>
    );
}

export default CreatePost;

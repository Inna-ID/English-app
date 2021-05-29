import React from 'react';
import LoginForm from './LoginForm/LoginForm';

// TODO: add routes
const App: React.FunctionComponent = () => {
    return (
        <div className="commentBox">
            Hello, world from React! I am a CommentBox.
            <LoginForm/>
        </div>
    );
}

export default App;

import React from 'react';

export const Error = () => {
    return (
        <div className={'error-container'}>
            <h1>Упс! :(</h1>
            <h2>Произошла ошибка!</h2>
            <h3>Пожалуйста проверьте свое интернет-соединение или повторите попытку позже</h3>
        </div>
    );
};

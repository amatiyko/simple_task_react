import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import Main from './Main';
import Details from './Details';
import Steps from './Steps';

import { createStore} from 'redux';
import { Provider} from 'react-redux';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';

const routes =
    <Route path="/" component={Layout}>
        <IndexRoute component={Main} />
        <Route path='details/:id' component={Details}>
            <Route path='steps' component={Steps} />
        </Route>
    </Route>;


// status progress, finished, deleted
const initial = [
    {
        id: "1",
        trackValue: "call mom",
        createdOn: '1000',
        finishOn: 'everyday task',
        status: 'progress'
    },
    {
        id: "2",
        trackValue: "feed cat",
        createdOn: '2000',
        finishOn: 'everyday task',
        status: 'progress'
    }
];

const initialData = localStorage.getItem('todo-app-data') ? JSON.parse(localStorage.getItem('todo-app-data')) : initial;

function playlist(state = initialData, action) {
    if (action.type === 'ADD_TRACK') {
        if (action.payload.trackValue === '') return state;
        action.payload.id = (state.length + 1).toString();
        if (action.payload.finishOn === '') action.payload.finishOn = 'everyday task';
        return [
            ...state,
            action.payload
        ];
    }
    if (action.type === 'DELETE_TRACK') {
        state[action.payload.id-1].status = 'deleted';
        return [...state];
    }
    if(action.type === 'FULL_DELETE_TRACK') {
        state.splice(action.payload.id-1, 1);
        for (var i = 0; i< state.length; i++) {
            state[i].id = (i+1).toString();
        }
        return [...state];
    }
    if (action.type === 'RESTORE_TRACK') {
        state[action.payload.id-1].status = 'progress';
        return [...state];
    }
    if (action.type === 'DONE_TRACK') {
        state[action.payload.id-1].status = 'finished';
        return [...state];
    }
    if (action.type === 'LATEST_SORT') {
        state.sort((a, b) => (b.createdOn-a.createdOn));
        return [...state];
    }
    if (action.type === 'NEWEST_SORT') {
        state.sort((a, b) => (a.createdOn-b.createdOn));
        return [...state];
    }
    return state;
}

const store = createStore(playlist);

store.subscribe(()=>{
    localStorage.setItem('todo-app-data', JSON.stringify(store.getState()));
});


ReactDOM.render(
    <Provider store={store}>
        <Router
            history={browserHistory}
            routes={routes}
        />
    </Provider>,
    document.getElementById('root'));

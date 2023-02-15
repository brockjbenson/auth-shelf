import { put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchShelfSaga() {
    try {
        const response = yield axios.get('/api/shelf');
        yield put({ type: 'SET_SHELF', payload: response.data });
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* addShelfSaga(action) {
    try {
        yield axios.post('/api/shelf', action.payload);
        yield put({ type: "FETCH_SHELF" });
    } catch (err) {
        console.log('post request failed', err);
    }
}

function* shelfSaga() {
    yield takeLatest('FETCH_SHELF', fetchShelfSaga);
    yield takeLatest('ADD_ITEM', addShelfSaga);
}

export default shelfSaga;

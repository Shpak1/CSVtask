import { put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga/effects';

 function* dispatchTebleData(action) {
    try {
        const {header, body} = action;
        yield put({type: 'DATA_TABLE', header:header, body:body});
    } catch (err) {
        console.log(err)
    }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield takeLatest('DISPATCH_DATA_TABLE', dispatchTebleData)

}

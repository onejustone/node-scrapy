import fetch from './fetch'
import Rx from 'rxjs/Rx'

// https://hackernoon.com/using-rxjs-to-handle-http-requests-what-ive-learned-4640aaf4646c
export function get$ (url, data) {
  return Rx.Observable.fromPromise(fetch({
      method: 'get',
      url: url,
      params: data
    }).catch(e => { throw Error(e) })
  )
  .catch(res => {
    console.error(res)
    return Rx.Observable.empty()
  })
}

export function xget$ (url, data) {
  return Rx.Observable.fromPromise(fetch({
    method: 'get',
    url: url,
    withCredentials: true,
    params: data
  }))
  .catch(res => {
    console.error(res)
    return Rx.Observable.empty()
  })
}

export function post (url, data, options) {
  return Rx.Observable.fromPromise(fetch({
    method: 'post',
    url,
    data
  }))
  .catch(res => {
    console.error(res)
    return Rx.Observable.empty()
  })
}

export function put (url, data, options) {
  return Rx.Observable.fromPromise(fetch({
    method: 'put',
    url,
    data
  }))
  .catch(res => {
    console.error(res)
    return Rx.Observable.empty()
  })
}

export function _delete (url, options) {
  return Rx.Observable.fromPromise(fetch({
    method: 'delete',
    url
  }))
  .catch(res => {
    console.error(res)
    return Rx.Observable.empty()
  })
}

export default {
  get$,
  xget$,
  post,
  put,
  _delete
}

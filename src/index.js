import http from './rapi/http'

const URI = `http://chuxin.360jlb.cn/user?id=3618365`

const result$ = http.get$(URI)

result$.subscribe(data => console.log(data))
// import Observable from 'rxjs/Observale'
// const { of } = require('rxjs')
// const Rx = require('rxjs/Rx')

// Rx.Observable.of('abcd').subscribe(function (value) {
//   console.log(value)
// })

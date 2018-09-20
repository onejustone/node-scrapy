import { get$ } from '../rapi/http.js'
// import Rx from 'rxjs/Rx'
function pingIphone () {
  // get$('https://www.apple.com/cn/shop/goto/buy_iphone/iphone_x')
  get$('www.baidu.com')
  .map(r => console.log(r))
  .catch(e => console.log('error'))
}

pingIphone()

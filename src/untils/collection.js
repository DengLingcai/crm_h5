import axios from 'axios'

export function createCollection (type, id) {
  //  type为要收藏文章的类型 (ARTICLE, PRODUCT, MEMBER, ORDER,)
  //  id为要创建收藏的文章id
  var parame = {
    'fkType': type,
    'fkId': id
  }
  return axios.post('/api/favorite/create', parame)
}
export function cancelCollection (favoriteid) {
  //  如果收藏会存在favoriteid  所以取消收藏的时候需要传入该favoriteid
  return axios.delete('/api/favorite/delete/' + favoriteid)
}

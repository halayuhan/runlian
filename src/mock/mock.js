// 引入mockjs
// const Mock = require('mockjs')
// // 获取 mock.Random 对象
// const Random = Mock.Random
// // 使用mockjs模拟数据
// Mock.mock('/api/data', (req, res) => {
//   // 当post或get请求到/api/data路由时Mock会拦截请求并返回上面的数据
//   let list = []
//   for (let i = 0; i < 30; i++) {
//     let listObject = {
//       userName: Random.cname(),
//       gender: Random.cword('男女', 1),
//       isInternal: Random.character('YN'),
//       department: Random.cword(3, 5),
//       phoneNumber: /^[1]([3-9])[0-9]{9}$/,
//       bookName: Random.cword(3, 10),
//       time: Random.date('yyyy-MM-dd')
//     }
//     list.push(listObject)
//   }
//   return {
//     data: list
//   }
// })

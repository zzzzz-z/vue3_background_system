import zarkRequest from ".."
interface IAccount {
  name: string,
  password: string
}
export function accountLoginRequst(account:IAccount){
  return zarkRequest.post({
    url: '/login',
    data: account
  })
}
export function getUserInfoById(id:number){
  return zarkRequest.get({
    url: `/users/${id}`
  })
}

export function getUserMenuByRoleId(id:number){
  return zarkRequest.get({
    url: `/role/${id}/menu`
  })
}
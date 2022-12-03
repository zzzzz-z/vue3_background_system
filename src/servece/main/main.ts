
import zarkRequest from ".."
export function getUserList(queryInfo: any) {
  return zarkRequest.post({
    url:'/users/list',
    data: queryInfo
  })
}
export function deleteUserById(id:number) {
  return zarkRequest.delete({
    url: `/users/${id}`
  })
}

export function getFullRoles() {
  return zarkRequest.post({
    url: '/role/list'
  })
}

export function getFullDepartment() {
  return zarkRequest.post({
    url: '/department/list'
  })
}

export function createUser(queryInfo: any) {
  return zarkRequest.post({
    url: '/users',
    data: queryInfo
  })
}

export function editUserData(id:number,queryInfo: any) {
  return zarkRequest.patch({
    url: `/users/${id}`,
    data: queryInfo
  })
}
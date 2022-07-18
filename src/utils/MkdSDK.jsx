export default function MkdSDK() {
  this._baseurl = 'https://reacttask.mkdlabs.com'
  this._project_id = 'reacttask'
  this._secret = '5fchxn5m8hbo6jcxiq3xddofodoacskye'
  this._table = ''
  this._custom = ''
  this._method = ''

  const raw = this._project_id + ':' + this._secret
  let base64Encode = btoa(raw)

  this.setTable = function (table) {
    this._table = table
  }

  this.login = async function (email, password, role) {
    //TODO
    // console.log(this.baseUrl)

    const url = this._baseurl + `/v2/api/lambda/login`
    const header = {
      'content-type': 'application/json',
      'x-project':
        'cmVhY3R0YXNrOjVmY2h4bjVtOGhibzZqY3hpcTN4ZGRvZm9kb2Fjc2t5ZQ==',
    }
    const result = await fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({ email: email, password: password, role: role }),
    })
    const user = await result.json()
    return user
  }

  this.getHeader = function () {
    return {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'x-project': base64Encode,
    }
  }

  this.baseUrl = function () {
    return this._baseurl
  }

  this.callRestAPI = async function (payload, method) {
    const header = {
      'Content-Type': 'application/json',
      'x-project':
        'cmVhY3R0YXNrOjVmY2h4bjVtOGhibzZqY3hpcTN4ZGRvZm9kb2Fjc2t5ZQ==',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    console.log(localStorage.getItem('token'))
    switch (method) {
      case 'GET':
        const getResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/GET`,
          {
            method: 'post',
            headers: header,
            body: JSON.stringify(payload),
          },
        )
        const jsonGet = await getResult.json()

        if (getResult.status === 401) {
          throw new Error(jsonGet.message)
        }

        if (getResult.status === 403) {
          throw new Error(jsonGet.message)
        }
        return jsonGet

      case 'PAGINATE':
        if (!payload.page) {
          payload.page = 1
        }
        if (!payload.limit) {
          payload.limit = 10
        }
        const url = this._baseurl + `/v1/api/rest/${this._table}/${method}`
        const paginateResult = await fetch(url, {
          method: 'post',
          headers: header,
          body: JSON.stringify(payload),
        })
        const jsonPaginate = await paginateResult.json()

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message)
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message)
        }
        return jsonPaginate
      default:
        break
    }
  }

  this.check = async function (role) {
    //TODO

    const url = this._baseurl + `/v2/api/lambda/check`
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
    console.log(url, user)
    const header = {
      'content-type': 'application/json',
      'x-project':
        'cmVhY3R0YXNrOjVmY2h4bjVtOGhibzZqY3hpcTN4ZGRvZm9kb2Fjc2t5ZQ==',
      Authorization: `Bearer ${user.token}`,
    }

    const result = await fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({ role }),
    })

    const response = await result.json()
    return response
  }
}

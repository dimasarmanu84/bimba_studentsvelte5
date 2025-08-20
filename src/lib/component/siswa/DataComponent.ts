import { PUBLIC_API_URL } from '$env/static/public'
import { SetHeaderApi } from '$lib/Helper'

export const getbillstudent = async (pageData: any, studentid: any) => {
  const url = `${PUBLIC_API_URL}api/trans/studentbill/reportstudentbill/` + Number(studentid)
  const result = await fetch(url, {
    method: 'GET',
    headers: SetHeaderApi(),
  })
  const jsonData = await result.json()
  return jsonData.data
}

export const getbillbystudentyear = async (pageData: any, studentid: number, periodyear: string) => {
  const url = `${PUBLIC_API_URL}api/trans/studentbill/getbillstudent/` + studentid + `/` + periodyear
  const response = await fetch(url, {
    method: 'GET',
    headers: SetHeaderApi(),
  })
  const json = await response.json()
  return json.data
}

export const getbillpayment = async (pageData: any, studentbillid: number) => {
  const url = `${PUBLIC_API_URL}api/trans/studentbillpayment/getbillpayment/` + studentbillid
  const response = await fetch(url, {
    method: 'GET',
    headers: SetHeaderApi(),
  })

  const json = await response.json()
  return json.data
}

export const getallbillstudentamount = async (pageData: any, studentid: number) => {
  const url = `${PUBLIC_API_URL}api/trans/studentbill/getbillstudentamount/` + studentid
  const response = await fetch(url, {
    method: 'GET',
    headers: SetHeaderApi(),
  })

  const json = await response.json()
  return json.data
}

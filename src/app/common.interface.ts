export interface user {
    success: boolean
    data: userMainData[]
    message: string
  }
  
  export interface userMainData {
    id: number
    name: string
    last_name: string
    address: string
    birth_date: string
    phone: string
    email: string
  }
  
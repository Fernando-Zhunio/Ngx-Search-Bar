export interface INsbParams {
    search: string | null
    paginate?: { page: { value: number; field: string }; pageSize: { value: number; field: string } }
    form?: { [key: string]: any }
  }
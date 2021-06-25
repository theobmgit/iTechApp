const tableList = ['Company', 'Expert', 'Invention', 'Technology', 'University']

const initialState = {
    tables: tableList.map(value => {
        return {name: value, select: false, visibility: true}
    }),
    columns: [],
    isLoading: false,
    data: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'tables/tableSelect': {
            if(state.isLoading)
                return state
            return {
                ...state,
                tables: state.tables.map(table => {
                    if (table.name !== action.payload.name)
                        return table
                    return {
                        ...table,
                        select: !table.select
                    }
                }),
                isLoading: true
            }
        }
        case 'columns/columnsLoad': {
            return {
                ...state,
                columns: action.payload.columns.map(column => {
                    return {
                        name: column,
                        select: false
                    }
                })
            }
        }
        case 'columns/columnSelect': {
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.name !== action.payload.column)
                        return column
                    return {
                        ...column,
                        select: !column.select
                    }
                })
            }
        }
        case 'isLoading/loaded': {
            return {
                ...state,
                isLoading: true
            }
        }
        case 'data/formSent': {
            return {
                ...state,
                data: action.payload.data
            }
        }
        default:
            return state
    }
}
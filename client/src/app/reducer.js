
const tableList = ['Company', 'Expert', 'Invention', 'Technology', 'University']

const initialState = {
    tables: tableList.map(value => {
        return {name: value, select: false, visibility: true}
    })
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'tables/tableSelect': {
            return {
                ...state,
                tables: state.tables.map(table => {
                    if(table.name !== action.payload.name)
                        return table
                    return {
                        ...table,
                        select: !table.select
                    }
                })
            }
        }
        default:
            return state
    }
}
import Axios from 'axios'

class ItemsApi {
    static listItems() {
        return Axios.get('/api/getItems')
    }
}

export default ItemsApi

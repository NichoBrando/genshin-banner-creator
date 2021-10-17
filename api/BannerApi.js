import Axios from 'axios'

class BannerApi {
    static listActiveBanners() {
        return Axios.get('/api/activeBanners')
    }

    static listBanners(start = 0, limit = 15) {
        return Axios.get(`/api/listBanners?start=${start}&limit=${limit}`)
    }

    static createBanner(data) {
        return Axios.post('/api/createBanner', data)
    }
}

export default BannerApi

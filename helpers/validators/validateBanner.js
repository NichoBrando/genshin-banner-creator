import * as yup from 'yup'

const validateBanner = async (banner) => {
    const bannerSchema = yup.object().shape({
        name: yup.string().required(),
        description: yup.string(),
        items: yup
            .array()
            .of(
                yup.object().shape({
                    id: yup.string().required(),
                    isLimited: yup.bool().default(false)
                })
            )
            .min(1)
    })

    if (await bannerSchema.isValid(banner)) {
        if (banner.items.some((item) => item.isLimited)) {
            return true
        }
    }
    return false
}

export default validateBanner

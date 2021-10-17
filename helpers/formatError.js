const formatError = (err) => {
    return err?.response?.data?.message || 'Something went wrong'
}

export default formatError
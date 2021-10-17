const invalidData = (res) => {
    res.status(400).json({
        message: 'Invalid data!'
    })
}

export default invalidData
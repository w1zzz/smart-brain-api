const Clarifai = require('Clarifai');

const app = new Clarifai.App({
    apiKey: 'fd0d734101884c55a58b6ecba3bb71eb'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input) 
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('Unable to work with API.'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to retrieve entries'));
}

module.exports = {
    handleImage,
    handleApiCall
};
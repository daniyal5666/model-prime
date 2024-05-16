function progress(req, res, next) {
    let progress = 0;

    const file_size = req.headers['content-length'];

    req.on('data', (chunk) => {
        progress += chunk.length;
        const percentage = (progress / file_size) * 100;
        return percentage;
    });

    next();
}

export default progress;

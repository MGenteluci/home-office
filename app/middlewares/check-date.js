/**
 * Middleware to check if date received from form is valid
 */
module.exports = (req, res, next) => {
    const dia = req.body.day.split('-');

    if(dia[0].length === 4){
        
        let data = new Date(dia);
        let hoje = new Date();
        console.log();

        if(data.getTime() < hoje.getTime()){
            return res.format({
                json: () => {
                    res.status(500).json({ error: 'Date cant be older than today!' });
                },
                html: () => {
                    return console.log('Date can\'t be older than today!');
                }
            });
        }

        if(data.getFullYear() > hoje.getFullYear()+1){
            return res.format({
                json: () => {
                    res.status(500).json({ error: 'You can\'t schedule a Home Office on that date!' });
                },
                html: () => {
                    return console.log('You can\'t schedule a Home Office on that date!');
                }
            });
        }
        
        next();

    }else{
        return res.format({
                json: () => {
                    res.status(500).json({ error: 'Invalid year!' });
                },
                html: () => {
                    return console.log('Invalid year!');
                }
            });
    }
};
const HomeOfficeController = require('../controllers/homeOffices');
/**
 * Middleware to check if date received from form is valid
 */
module.exports = (req, res, next) => {
    const dia = req.body.day.split('-');

    if(dia[0].length === 4){
        
        let data = new Date(dia);
        let h = new Date();
        let hoje = new Date(h.getFullYear(), h.getMonth(), h.getDate());

        if(data.getTime() < hoje.getTime()){
            return res.format({
                json: () => {
                    res.status(500).json({ error: 'Date cant be older than today!' });
                },
                html: () => {
                    HomeOfficeController.formError(req, res, next, 'A data não pode ser anterior ao dia de hoje!');
                }
            });
        }

        if(data.getFullYear() > hoje.getFullYear()+1){
            return res.format({
                json: () => {
                    res.status(500).json({ error: 'You can\'t schedule a Home Office on that date!' });
                },
                html: () => {
                    HomeOfficeController.formError(req, res, next, 'Não é possível agendar um Home Office tão distante!');
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
                    HomeOfficeController.formError(req, res, next, 'Ano inválido!');
                }
            });
    }
};
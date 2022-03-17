const { check, validationResult } = require('express-validator');

const generateAdoptionValidators = () => [
    check('user_id').notEmpty().isNumeric().withMessage("Invalid user_id"),
    check('pet_id').notEmpty().isNumeric().withMessage("Invalid pet_id"),
    check('date').notEmpty().isDate(["YYYY / MM / DD"]).withMessage("Invalid date")
]

const generateIdValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid ID")
]

const generateUserIdValidators = () => [
    check('user_id').notEmpty().isNumeric().withMessage("Invalid User ID")
]

const UpdateAdoptionValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid ID"),
    check('user_id').isNumeric().withMessage("Invalid user_id"),
    check('pet_id').isNumeric().withMessage("Invalid pet_id"),
    check('date').isDate(["YYYY / MM / DD"]).withMessage("Invalid date")
]

const reporter = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({
            "success": false,
            "code": 404,
            "message": errors,
            "data": []
        });
    }
    next();
}

module.exports = {
    add: [
        generateAdoptionValidators(),
        reporter
    ],
    id: [
        generateIdValidators(),
        reporter
    ],
    update: [
        UpdateAdoptionValidators(),
        reporter
    ],
    userid: [
        generateUserIdValidators(),
        reporter
    ]
};
const Unit = require('../models').Unit;

// insert Unit
const addUnit = async (req, res) => {
    try {
        const body = req.body;

        const isExist = await Unit.findOne({ where: { name: body.name, code: body.code } });
        if (isExist) return res.status(404).send({ status: false, message: "This Unit is already exist. Please try another one." });

        const addUnitData = await Unit.create(body);
        if (!addUnitData) return res.status(400).send({ status: false, message: "Something went wrong. while insert Unit data.!!", data: {} });

        return res.status(200).send({ status: true, message: "Unit added successfully.", data: addUnitData, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// update Unit
const updateUnit = async (req, res) => {
    try {
        const body = req.body;
        const { unit_id } = req.query;

        const checkUnit = await Unit.findByPk(unit_id);
        if (!checkUnit) return res.status(404).send({ status: false, message: "This Unit does not exist. Please check Unit ID." });

        const [affectedRows] = await Unit.update(body, { where: { id: unit_id } });
        if (affectedRows === 0) return res.status(400).send({ status: false, message: "No changes were made to the Unit data. Please check the provided information.", data: {} });

        return res.status(200).send({ status: true, message: "Unit updated successfully.", data: {} });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], });
    }
};

// get  Unit List
const getUnitList = async (req, res) => {
    try {  
        const getUnitList = await Unit.findAll();
        if (getUnitList.length === 0) return res.status(404).send({ status: false, message: "No units found for the given category.", data: [] });

        return res.status(200).send({ status: true, message: "Unit list retrieved successfully.", data: getUnitList });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], error: Err });
    }
};


// get  Unit by unit_id
const getUnit = async (req, res) => {
    try {
        const { unit_id } = req.query

        const getUnitData = await Unit.findByPk(unit_id);
        if (!getUnitData) return res.status(400).send({ status: false, message: "Unit data not found", data: {} });

        return res.status(200).send({ status: true, message: "Unit get successfully", data: getUnitData, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const deleteUnit = async (req, res) => {
    try {
        const { unit_id } = req.query;

        const checkUnit = await Unit.destroy({ where: { id: unit_id } });
        if (!checkUnit) return res.status(404).send({ status: false, message: "This Unit does not exist. Please check Unit ID." });

        return res.status(200).send({ status: true, message: `Unit deleted successfully.`, data: {} });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], error: Err });
    }
};


module.exports = {
    addUnit,
    getUnitList,
    getUnit,
    deleteUnit,
    updateUnit
}
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

// Get all Mahasiswa
router.get('/', (req, res) => {
    connection.query('SELECT * FROM mahasiswa ORDER BY id_m DESC', (err, rows) => {
        if (err) {
            console.error('Error retrieving Mahasiswa data:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Mahasiswa data retrieved successfully');
        return res.status(200).json({ status: true, message: 'Data Mahasiswa', data: rows });
    });
});

// Create new Mahasiswa
router.post('/store', [
    body('nama').notEmpty(),
    body('nrp').notEmpty(),
    body('jurusan').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error('Validation errors:', errors.array());
        return res.status(422).json({ errors: errors.array() });
    }

    const data = {
        nama: req.body.nama,
        nrp: req.body.nrp,
        jurusan: req.body.jurusan,
    };

    connection.query('INSERT INTO mahasiswa SET ?', data, (err, result) => {
        if (err) {
            console.error('Error creating Mahasiswa:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Mahasiswa created successfully');
        return res.status(201).json({ status: true, message: 'Mahasiswa has been created!', data: result });
    });
});

// Get Mahasiswa by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    connection.query('SELECT * FROM mahasiswa WHERE id_m = ?', id, (err, rows) => {
        if (err) {
            console.error('Error retrieving Mahasiswa data:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ status: false, message: 'Mahasiswa not found' });
        }

        console.log('Mahasiswa data retrieved successfully');
        return res.status(200).json({ status: true, message: 'Data Mahasiswa', data: rows[0] });
    });
});

// Update Mahasiswa by ID
router.put('/update/:id', [
    body('nama').notEmpty(),
    body('nrp').notEmpty(),
    body('jurusan').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error('Validation errors:', errors.array());
        return res.status(422).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const data = {
        nama: req.body.nama,
        nrp: req.body.nrp,
        jurusan: req.body.jurusan,
    };

    connection.query('UPDATE mahasiswa SET ? WHERE id_m = ?', [data, id], (err, result) => {
        if (err) {
            console.error('Error updating Mahasiswa:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Mahasiswa updated successfully');
        return res.status(200).json({ status: true, message: 'Mahasiswa has been updated!', data: result });
    });
});

// Delete Mahasiswa by ID
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    connection.query('DELETE FROM mahasiswa WHERE id_m = ?', id, (err, result) => {
        if (err) {
            console.error('Error deleting Mahasiswa:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Mahasiswa not found' });
        }

        console.log('Mahasiswa deleted successfully');
        return res.status(200).json({ status: true, message: 'Mahasiswa has been deleted!', data: result });
    });
});

module.exports = router;

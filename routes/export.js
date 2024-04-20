// routes/export.js

const express = require('express');
const router = express.Router();
const excel = require('exceljs');

router.get('/users', async (req, res) => {
    try {
        const users = await User.query();

        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Users');
        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Mobile', key: 'mobile', width: 15 }
        ];

        users.forEach(user => {
            worksheet.addRow({
                name: user.name,
                email: user.email,
                mobile: user.mobile
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.query();

        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Tasks');
        worksheet.columns = [
            { header: 'User', key: 'user', width: 20 },
            { header: 'Task Name', key: 'taskName', width: 30 },
            { header: 'Task Type', key: 'taskType', width: 20 },
            { header: 'Status', key: 'status', width: 15 }
        ];

        tasks.forEach(task => {
            worksheet.addRow({
                user: task.user.name,
                taskName: task.name,
                taskType: task.type,
                status: task.status
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=tasks.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

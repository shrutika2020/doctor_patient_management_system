module.exports = (sequelize, Sequelize) => {

    const Patient = sequelize.define("patients", {
        // id: {
        //     type: Sequelize.BIGINT(19).UNSIGNED,
        //     primaryKey: true,
        //     autoIncrement: false,
        // },
        first_name: {

            type: Sequelize.STRING

        },

        last_name: {

            type: Sequelize.STRING

        },
        address: {

            type: Sequelize.STRING

        },
        mobile: {

            type: Sequelize.INTEGER

        },
        dob: {

            type: Sequelize.STRING

        },
        city: {
            type: Sequelize.STRING

        },
        createdBy: {
            type: Sequelize.INTEGER

        },
        

    }, 
    {
        freezeTableName: true,
        tableName: "patients"
    }
    );


    return Patient;

};
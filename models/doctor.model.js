module.exports = (sequelize, Sequelize) => {

    const Doctor = sequelize.define("doctors", {
        // id: {
        //     type: Sequelize.BIGINT(19).UNSIGNED,
        //     primaryKey: true,
        //     autoIncrement: false,
        // },
        email: {

            type: Sequelize.STRING,
            unique: true

        },

        first_name: {

            type: Sequelize.STRING

        },

        last_name: {

            type: Sequelize.STRING

        },
        password: {

            type: Sequelize.STRING

        },
        dob: {

            type: Sequelize.STRING

        },
        // hospital_clinic: {
        //     type: Sequelize.STRING

        // }

    },
    {
        freezeTableName: true,
        tableName: "doctors"
    }
    );


    return Doctor;

};
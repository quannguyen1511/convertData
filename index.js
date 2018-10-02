var sql = require("mssql");
const config = {
    user: 'quan1234',
    password: 'quan1234',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'DiseaseOntologyDb',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

async function getData() {
    try {
        let pool = await sql.connect(config)
        let result1 = await pool.request()
            .query('select Id from Disease')
            
        var key = Object.keys(result1)[1];
        var result2 = result1[key];
        // console.dir(result2[0]["Id"]);
        let result3 = await pool.request()
                    .input('id', sql.Int,/*result2[0]["Id"]*/12)
                    .query('select d.Id, d.Iao, d.LabelEn, d.LabelVn, dp.LabelVn as TC from Disease d, DiseaseProperty dp, DiseasesProperties dps where dps.DiseasesId = @id AND dp.Id = dps.PropertyId AND d.Id = dps.DiseasesId')
        // console.dir(result3[Object.keys(result3)[1]]) 
        // var trieuChung = "";
        var result = {};
        var trieuChung = result3[Object.keys(result3)[1]].reduce((kq, element) => {
            return kq += element["TC"] + " "
        }, "");
        console.log(trieuChung)
        result["Id"] = result3[Object.keys(result3)[1]][0]["Id"];
        result["Iao"] = result3[Object.keys(result3)[1]][0]["Iao"];
        result["LabelVn"] = result3[Object.keys(result3)[1]][0]["LabelVn"];
        result["LabelEn"] = result3[Object.keys(result3)[1]][0]["LabelEn"];
        result["TC"] = trieuChung;
        
        console.log(result);
        // result2.forEach(element => {
        //     console.dir(element["DiseaseId"].replace(/'/g,""))
        // });

        // Stored procedure
        
        // let result2 = await pool.request()
        //     .input('input_parameter', sql.Int, value)
        //     .output('output_parameter', sql.VarChar(50))
        //     .execute('procedure_name')
        
        // console.dir(result2)
    } catch (err) {
        // ... error checks
    }
}
 
// sql.on('error', err => {
//     // ... error handler
// })
getData();
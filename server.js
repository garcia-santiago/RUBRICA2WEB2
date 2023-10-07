const express = require('express')

const app = express()
const {PORT} = require('./config')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const connection = require('./db');

// PRODUCTOS

app.get('/productos', (req, res)=>{
    try {
        const getSql = "SELECT * from productos";
        connection.query(getSql, function (err, result) {
          if (err) throw err;
          if(result.length==0){
            res.status(200).send("No hay registros!")
          }
          else{
            res.status(200).send(result)
            res.end()
          }

        });
      } catch (error) {
        res.status(400).send(error.message)
      }
})

app.get('/productos/:id_producto', (req, res)=>{
    try {
        const id_producto = req.params.id_producto
        const getSql = `SELECT * from productos WHERE id=${id_producto}`;
        connection.query(getSql, function (err, result) {
          if (err) {res.status(400).send("Error en la consulta!")};
          if(result.length==0){
            res.status(200).send("No exite el registro!")
          }
          else{
            res.status(200).send(result)
            res.end()
          }
        });
      } catch (error) {
        res.status(400).send(error.message)
      }
})

app.post('/productos/', (req, res) =>{
    try {
        const {id_producto, nombre, descripcion, precio, stock} = req.body

        const postSql = `INSERT INTO productos SET id=?, nombre=?, descripcion=?, precio=?, stock=?`;

        connection.query(postSql, [id_producto, nombre, descripcion, precio, stock], function (err, result) {
          if (err) throw err;
          res.status(200).send("Producto agregado correctamente!")
          res.end()
        }); 
      } catch (error) {
        res.status(400).send(error.message)
      }
})

app.patch('/productos/', (req, res) =>{
    try {
        const {id_producto, nombre, descripcion, precio, stock} = req.body

        const patchSql = `UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=? WHERE id=?`;

        connection.query(patchSql, [nombre, descripcion, precio, stock, id_producto], function (err, result) {
          if (err) throw err;
          if(result.affectedRows==1){
            res.status(200).send("Registro actualizado correctamente!")
            res.end()
          }
          else{
            res.status(200).send("Error actualizando registro!")
            res.end()
          }
        }); 
      } catch (error) {
        res.status(400).send(error.message)
      }
})

app.delete('/productos/:id_producto', (req, res)=>{
    try {
        const id_producto = req.params.id_producto
        const deleteSql = `DELETE from productos WHERE id=${id_producto}`;
        connection.query(deleteSql, function (err, result) {
          if (err) throw err;
          if(result.affectedRows==1){
            res.status(200).send("Registro eliminado correctamente!")
            res.end()
          }
          else{
            res.status(200).send("Error eliminando registro!")
            res.end()
          }
        });
      } catch (error) {
        res.status(400).send(error.message)
      }
})

// VENTAS
app.get('/ventas', (req, res)=>{
    try {
        const getSql = "SELECT * from ventas";
        connection.query(getSql, function (err, result) {
          if (err) throw err;
          if(result.length==0){
            res.status(200).send("No hay registros!")
          }
          else{
            res.status(200).send(result)
            res.end()
          }
        });
      } catch (error) {
        res.status(400).send(error.message)
      }
})

app.get('/ventas/:id_venta', (req, res)=>{
    try {
        const id_venta= req.params.id_venta
        const getSql = `SELECT * from ventas WHERE id_venta=${id_venta}`;
        connection.query(getSql, function (err, result) {
          if (err) throw err;
          if(result.length==0){
            res.status(200).send("No exite el registro!")
          }
          else{
            res.status(200).send(result)
            res.end()
          }
        });
      } catch (error) {
        res.status(400).send(error.message)
      }
})

app.post('/ventas/', (req, res) =>{
    try {

        const {id_venta, id_producto, nombre_cliente, telefono_cliente, fecha_venta, cantidad_venta} = req.body

        connection.query(`SELECT stock from productos WHERE id=${id_producto}`, function (err, result) {
            if (err) throw err;
            if(result[0].stock<cantidad_venta){
                res.status(200).send("No hay stock suficiente!")
                res.end()
            }
            else{
                const postSql = `INSERT INTO ventas SET id_venta=?, id_producto=?, nombre_cliente=?, telefono_cliente=?, fecha_venta=?, cantidad_venta=?`;

                connection.query(postSql, [id_venta, id_producto, nombre_cliente, telefono_cliente, fecha_venta, cantidad_venta], function (err, result) {
                  if (err) throw err;
                  res.status(200).send("Venta agregado correctamente!")
                  res.end()
                }); 
            }
          });

      } catch (error) {
        res.status(400).send(error.message)
      }
})

app.patch('/ventas/', (req, res) =>{
    try {
        const {id_venta, id_producto, nombre_cliente, telefono_cliente, fecha_venta, cantidad_venta} = req.body

        const postSql = `UPDATE ventas SET id_producto=?, nombre_cliente=?, telefono_cliente=?, fecha_venta=?, cantidad_venta=? WHERE id_venta=?`;

        connection.query(postSql, [id_producto, nombre_cliente, telefono_cliente, fecha_venta, cantidad_venta, id_venta], function (err, result) {
          if (err) throw err;
          if(result.affectedRows==1){
            res.status(200).send("Registro actualizado correctamente!")
            res.end()
          }
          else{
            res.status(200).send("Error actualizando registro!")
            res.end()
          }
        });  
      } catch (error) {
        res.status(400).send(error.message)
      }
})

app.delete('/ventas/:id_venta', (req, res)=>{
    try {
        const id_venta = req.params.id_venta
        const deleteSql = `DELETE from ventas WHERE id_venta=${id_venta}`;
        connection.query(deleteSql, function (err, result) {
          if (err) throw err;
          if(result.affectedRows==1){
            res.status(200).send("Registro eliminado correctamente!")
            res.end()
          }
          else{
            res.status(200).send("Error eliminando registro!")
            res.end()
          }
        });
      } catch (error) {
        res.status(400).send(error.message)
      }
})




app.listen(PORT, () => console.log(`Escuchando en puerto: ${PORT}`))
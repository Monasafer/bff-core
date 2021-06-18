const express = require('express');
const userService = require('../services/userServices/userService')
const router = express.Router();
const validations = require('../services/userServices/validationsUser');

router.get('/user', async (req,res)=>{
          let user_id = req.headers['user-id'];
          let pass = req.headers['pass'];
          const response = await userService.getUser(user_id, pass);
          console.log("userService.getUser Response : " + response);
          res.json(response);    
});

router.post('/user',validations.validate(validations.createUserSchema),async (req, res,next) => {
          const { user,pass, mail } = req.body;
          const response = await userService.setUser(user,pass, mail)
          console.log("userService.setUser Response : " + response);
          res.json(response);  
});
      
router.put('/user/:userId', async (req, res) => {
        let user_id = req.params.userId;
        let pass = req.headers['pass'];
        let new_pass = req.headers['new_pass'];      
        const response = await userService.updateUser(user_id, pass,new_pass)
        console.log("userService.updateUser Response : " + response);
        res.json(response);  
      });
      
router.delete('/user', async (req, res) => {
        let user_id = req.headers['user-id'];
        let pass = req.headers['pass']

        const response = await userService.deleteUser(user_id, pass)
        console.log("userService.deleteUser Response : " + response);
        res.json(response);  
      });
      
module.exports = router; 
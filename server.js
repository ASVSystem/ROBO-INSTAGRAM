const { Console } = require('console');
const express = require ('express');
const puppeteer = require('puppeteer');
require('dotenv/config');
//const bodyParser =require ('body-parser')
//import express  from 'express';
//import puppeteer from 'puppeteer'

const app = express()

app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}))


  
  (async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://instagram.com',{
      waitUntil: 'networkidle2',
    });
  
    const usuario = process.env.USUARIO_INSTA;
    const senha = process.env.SENHA_INSTA;

    await page.type('[name="username"]', usuario);
    await page.type('[name="password"]', senha);
  

    await page.click('[type=submit]',{delay:5000});
    const button = await page.waitForSelector(() => {
     let b = document.querySelectorAll('button')
     let agora = [...b].filter(e => e.innerText=='Agora não')
       
  }, {delay:5000});
    console.log(button)
  // await page.click(`${button}`,{delay:5000});

    // page.evaluate(() =>{
    //   //Logar no Instagram

      
    // })
    
  //console.log(usuario)
  
     //await page.screenshot({ path: 'instagram.png' });
    //await browser.close();
  })();



app.listen(3002, () => {
    console.log('Server is running!')
})
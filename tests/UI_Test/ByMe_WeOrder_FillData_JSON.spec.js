const fs = require('fs');
const { test, expect } = require('@playwright/test');

// Reads the JSON file and saves it  
let objects = fs.readFileSync('./tests/Test_Data/ByMe_WebOrder_Fill_Data.json')
const users = JSON.parse(objects);

for (const record of users) {
test(`Web Order Data FillFunctionality: ${record.test_case}`, async ({ page }) => {
 //console.log(record.name, record.password, record.exp_result);
await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
await page.getByRole('textbox', { name: 'Username:' }).fill('Tester');
await page.getByRole('textbox', { name: 'Password:' }).click();
await page.getByRole('textbox', { name: 'Password:' }).fill('test');
await expect(page.getByRole('button', { name: 'Login' })).click();
//await page.getByRole('heading', { name: 'List of All Orders' }).click();
await page.getByRole('combobox', { name: 'Product:*' }).selectOption('FamilyAlbum');
//await page.getByRole('heading', { name: 'Product Information' }).click();

if('Quantity must be greater than zero.' == record.exp_res) 
    {
        await page.waitForTimeout(5000);
        page.getByRole('textbox', { name: 'Quantity:*' }).toHaveText(record.exp_res);
    }
});
}
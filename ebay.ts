import { test, expect, Page} from '@playwright/test';

test.only('Verify item can be added to cart on eBay', async ({ browser  }) => {
  
    const context = await browser.newContext();
    const page = await context.newPage();

  await page.goto('https://www.ebay.com');		//navigate to eBay.com

  // Search 'book' and Search
    await page.locator('#gh-ac').fill('book');
    await page.locator('#gh-search-btn').click();


    await page.locator("//li[@class='fake-tabs__item'][2]").click();   // Click 'Buy It Now'

 

    const [newTab] = await Promise.all([
     // Wait for new tab
    context.waitForEvent('page'),
    page.locator('li.s-item a.s-item__link').first().click()// Click triggers tab
    
  ]);

    await newTab.waitForLoadState();

    await newTab.getByRole('button', { name: 'Add to cart' }).click();   // Add to cart

    page.on('dialog', dialog => dialog.accept());
    await page.locator("//button[@aria-label='Close overlay']").click();    //close the dialog box

     await newTab.close();

    // Verify item is added to cart
     const cartCount = page.locator('.badge');
  
     await expect(cartCount).toHaveText('/[1-9]+/');

     await console.log('Item added to cart successfully!');
});

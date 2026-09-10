import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('all 118 elements load and source-aware inspection works',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.locator('#manuscript')).toBeVisible();
 const buttons=page.getByRole('button',{name:/^Open (?!project)/});
 // Scope to canonical element buttons, not toolbar actions.
 const ids=await page.locator('.tree summary button').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('aria-label')!));
 expect(ids).toHaveLength(118);
 for(const name of ids){await page.getByRole('button',{name,exact:true}).click();await expect(page.locator('#manuscript')).toBeVisible();await expect(page.locator('.inspector-identity h2')).toHaveText(name.replace('Open ',''));}
 await page.getByRole('button',{name:'03Data',exact:false}).click();
 await expect(page.getByRole('cell',{name:'NOT_APPLICABLE dimensionless',exact:false})).toHaveCount(0);
 await expect(page.locator('.data-section')).toContainText('NOT_APPLICABLE');
 await expect(page.locator('.data-section')).toContainText('PREDICTED');
 expect(errors).toEqual([]);
});
test('draft edits persist and project export is recoverable',async({page})=>{
 await page.goto('/');const editor=page.locator('#manuscript');await expect(editor).toBeVisible();
 await editor.fill('# Edited Hydrogen\n\nA local draft with **real preview**.');
 await expect(page.locator('article')).toContainText('real preview');await page.reload();await expect(editor).toHaveValue(/Edited Hydrogen/);
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Download project',exact:true}).click();expect((await download).suggestedFilename()).toBe('MAT-project.json');
});
test('periodic navigation, keyboard search, mobile and accessibility',async({page})=>{
 await page.goto('/');await expect(page.locator('#manuscript')).toBeVisible();
 await page.getByRole('button',{name:'Periodic table',exact:true}).click();
 await expect(page.locator('button[title*="MAT:"]')).toHaveCount(118);
 await page.keyboard.press('Control+k');await expect(page.getByPlaceholder(/Name, symbol/)).toBeFocused();
 await page.getByPlaceholder(/Name, symbol/).fill('Og');await expect(page.locator('button[title*="Oganesson"]')).toHaveCount(1);
 await page.getByPlaceholder(/Name, symbol/).fill('');
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations).toEqual([]);
 await page.setViewportSize({width:390,height:844});await expect(page.locator('#manuscript')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
});
test('resolved Carbon citations retain draft review and failed loads can retry',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Open Carbon',exact:true}).click();await expect(page.locator('#manuscript')).toBeVisible();
 await page.getByRole('button',{name:/04Review/}).click();await expect(page.locator('.review')).toContainText('SRC-000084');await expect(page.locator('.review')).toContainText('No unresolved registry IDs detected');await expect(page.locator('.review')).toContainText('Scientific and editorial review remain required');
 await page.route('**/publication-elements.json',r=>r.fulfill({status:503,body:'offline'}));await page.reload();await expect(page.getByRole('alert')).toContainText('503');
 await page.unroute('**/publication-elements.json');await page.getByRole('button',{name:'Retry',exact:true}).click();await expect(page.locator('#manuscript')).toBeVisible();
});

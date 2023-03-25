var puppeteer=require("puppeteer");
(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page=await browser.newPage();
    await page.goto("https://www.github.com/trending");
    var repositories = await page.evaluate(() => {
        var repos=document.querySelectorAll(".Box-row");
        let reposArr = [];
        repos.forEach((repo) => {
            var repo_titleinfo = repo.querySelectorAll("h1 > a");
            var description_text = repo.querySelectorAll("p");
            var description_info=description_text[0];
            var urlinfo = repo.querySelectorAll("h1 > a"); 
            var numstars = repo.querySelectorAll("div.f6.color-fg-muted.mt-2 > a:nth-child(2)");
            var numforks=repo.querySelectorAll("div.f6.color-fg-muted.mt-2 > a:nth-child(3)");
            var prglang=repo.querySelectorAll("div.f6.color-fg-muted.mt-2 > span.d-inline-block.ml-0.mr-3 > span:nth-child(2)");
            reposArr.push({title:repo_titleinfo[0]?.innerText,description:description_info?.innerText,url:urlinfo[0].href,stars:numstars[0]?.innerText,forks:numforks[0]?.innerText,language:prglang[0]?.innerText});
        });
        return reposArr;
    });
    const FileSystem = require("fs");
    var ans=JSON.stringify(repositories);
    FileSystem.writeFile('data.json',ans, (error) => {
    if (error) throw error;
  });
    console.log(ans);
    await browser.close();

})();

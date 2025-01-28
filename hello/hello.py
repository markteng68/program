import asyncio
from pyppeteer import launch
import os

async def scrape_product_links():
    browser = await launch(headless=True, executablePath='C:/Program Files/Google/Chrome/Application/chrome.exe')
    page = await browser.newPage()

    # 访问目标网页，并等待页面完全加载
    url = 'https://www.notino.it/brand-cosmetici-italiani/'
    
    await page.goto(url, {'timeout': 60000, 'waitUntil': 'domcontentloaded'})
    print(" 页面加载完成，继续执行后续代码...")


     # 获取页面上所有的链接
    links = await page.evaluate('''() => {
        return Array.from(document.querySelectorAll('a')).map(link => link.href);
    }''')

    print(f"🔗 页面上找到 {len(links)} 个链接，开始检查目标链接...")
    # 等待页面完成导航（可以确保网络请求加载完成）
    # await page.waitForNavigation({'waitUntil': 'networkidle2', 'timeout': 120000})

    # 等待产品列表中的链接元素出现
    
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
    await asyncio.sleep(5)  # 让页面加载更多内容

 # 测试是否可以找到特定链接
    specific_link = "https://www.notino.it/collistar/special-perfect-body-gel-dimagrante-corpo-anticellulite/"
    link_exists = await page.evaluate(f'''() => {{
        return Array.from(document.querySelectorAll('a')).some(link => link.href === "{specific_link}");
    }}''')

    if link_exists:
        print(f"✅ 找到特定链接: {specific_link}")
    else:
        print(f"❌ 未找到特定链接: {specific_link}")

    await browser.close()

    await page.waitForSelector('div[data-testid="product-container"] a', { 'timeout': 120000})

    # 提取产品链接
    links = await page.evaluate('''() => {
        return Array.from(document.querySelectorAll('div[data-testid="product-container"] a'))
            .map(link => link.href);
    }''')

    # 处理相对路径，确保所有链接完整
    base_url = "https://www.notino.it"
    product_links = [link if link.startswith("http") else base_url + link for link in links]

    # 保存到文本文件
    save_path = r'C:\Users\mark0\Desktop\program\hello'
    os.makedirs(save_path, exist_ok=True)
    file_path = os.path.join(save_path, 'product_links.txt')

    with open(file_path, 'w', encoding='utf-8') as file:
        for link in product_links:
            file.write(link + '\n')

    print(f"提取到 {len(product_links)} 个产品链接，已保存到 {file_path}")

    await browser.close()

# 运行脚本
asyncio.get_event_loop().run_until_complete(scrape_product_links())
